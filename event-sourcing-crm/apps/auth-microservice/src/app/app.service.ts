import {Inject, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RMQ_EVENTS_CLIENT_ID, RMQ_USERS_CLIENT_ID} from "./constants/constants";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthSessionEntity} from "./entities/auth-session.entity";
import {Repository} from "typeorm";
import {SignUpDto} from "./dto/sign-up.dto";
import {AccessTokenDto} from "./dto/access-token.dto";
import {UserDto} from "./dto/user.dto";
import {firstValueFrom} from "rxjs";
import {CreateAuthSessionDto} from "./dto/create-auth-session.dto";
import {JwtService} from "@nestjs/jwt";
import bcrypt from "bcrypt";
import {SignInDto} from "./dto/sign-in.dto";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class AppService {
  constructor(@InjectRepository(AuthSessionEntity) private readonly authSessionRepo: Repository<AuthSessionEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(RMQ_USERS_CLIENT_ID) private readonly usersClient: ClientProxy,
              private readonly jwtService: JwtService,
              @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {
  }

  async findAll(): Promise<AuthSessionEntity[]> {
    const cachedAuthSessions: AuthSessionEntity[] | undefined = await this.cache.get(`authSessions:all`)
    if (cachedAuthSessions) {
      return cachedAuthSessions;
    }
    const result = await this.authSessionRepo.find();
    await this.cache.set(`authSessions:all`, result);
    return result;
  }

  async findOne(id: string): Promise<AuthSessionEntity> {
    const cachedAuthSessions: AuthSessionEntity | undefined = await this.cache.get(`authSessions:${id}`)
    if (cachedAuthSessions) {
      return cachedAuthSessions;
    }
    const target: AuthSessionEntity | null = await this.authSessionRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`Auth session with id: ${id} not found`);
    }
    await this.cache.set(`authSessions:${id}`, target);
    return target;
  }

  async findByUserId(userId: string): Promise<AuthSessionEntity> {
    const cachedAuthSessions: AuthSessionEntity | undefined = await this.cache.get(`authSessions:${userId}`)
    if (cachedAuthSessions) {
      return cachedAuthSessions;
    }
    const target = await this.authSessionRepo.findOneBy({userId})
    if (!target) {
      throw new NotFoundException(`Auth session with user id: ${userId} not found`);
    }
    await this.cache.set(`authSessions:${userId}`, target);
    return target;
  }

  async createOne(dto: CreateAuthSessionDto, role: string): Promise<AuthSessionEntity> {
    const MonthInSeconds = 60 * 60 * 24 * 30;
    const currentDateInSeconds = new Date().getSeconds()
    const expiresIn = currentDateInSeconds + MonthInSeconds
    const refreshToken = this.jwtService.sign({sub: dto.userId, role}, {expiresIn});
    const salt = await bcrypt.genSalt(12)
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt)
    const existedAuthSession: AuthSessionEntity | null = await this.authSessionRepo.findOneBy({userId: dto.userId})
    if (existedAuthSession) {
      await this.deleteOne(existedAuthSession.id)
    }
    const authSession = await this.authSessionRepo.create({...dto, expiresAt: new Date(expiresIn), refreshTokenHash})
    await this.authSessionRepo.save(authSession);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "auth",
      action: "created",
      subjectId: authSession.id,
      actorId: dto.userId,
    });
    return authSession;
  }

  async refreshAccessToken(accessToken: string): Promise<AccessTokenDto> {
    const payload = this.jwtService.verify(accessToken);
    return await this.generateAccessToken(payload.sub, payload.role)
  }

  async generateAccessToken(userId: string, role: string): Promise<AccessTokenDto> {
    const authSession = await this.findByUserId(userId);
    if (!authSession) {
      throw new UnauthorizedException(`Auth session with user id: ${userId} not found`);
    }
    const currentDateInSeconds = new Date().getSeconds()
    if (new Date(authSession.expiresAt).getTime() < currentDateInSeconds) {
      await this.authSessionRepo.delete(authSession.id)
      throw new UnauthorizedException("Auth session is expired");
    }
    const thirtyMinutesInSeconds = 60 * 30;
    const expiresIn = currentDateInSeconds + thirtyMinutesInSeconds;
    const accessToken = this.jwtService.sign({sub: userId, role}, {expiresIn});
    return {accessToken};
  }

  async signUp(dto: SignUpDto, ip: string): Promise<AccessTokenDto> {
    const user: UserDto = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: createUser"}, {dto}))
    const { id, role } = user;
    await this.createOne({userId: id, ip}, role)
    return await this.generateAccessToken(id, role)
  }

  async signIn(dto: SignInDto, ip: string): Promise<AccessTokenDto> {
    const user: UserDto = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: findByEmail"}, {email: dto.email}))
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException("Incorrect email or password");
    }

    await this.createOne({userId: user.id, ip}, user.role)
    return await this.generateAccessToken(user.id, user.role)
  }

  async logout(accessToken: string): Promise<void> {
    const payload = this.jwtService.decode(accessToken)
    const authSession = await this.findByUserId(payload.sub)
    if (!authSession) {
      throw new NotFoundException(`Auth session with user id: ${payload.sub} not found)`);
    }
    await this.deleteOne(authSession.id)
  }

  async deleteOne(id: string): Promise<void> {
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`Auth session with id: ${id} not found`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "auth",
      action: "deleted",
      actorId: target.userId,
      subjectId: target.id,
    });
    await this.authSessionRepo.delete(id)
  }


}
