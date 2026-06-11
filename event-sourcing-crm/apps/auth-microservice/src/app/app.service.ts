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

@Injectable()
export class AppService {
  constructor(@InjectRepository(AuthSessionEntity) private readonly authSessionRepo: Repository<AuthSessionEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(RMQ_USERS_CLIENT_ID) private readonly usersClient: ClientProxy,
              private readonly jwtService: JwtService
  ) {
  }

  async findAll(): Promise<AuthSessionEntity[]> {
    return await this.authSessionRepo.find();
  }

  async findOne(id: string): Promise<AuthSessionEntity> {
    const target: AuthSessionEntity | null = await this.authSessionRepo.findOneBy({id})
    if (!target) {
      throw new NotFoundException(`Auth session with id: ${id} not found`);
    }
    return target;
  }

  async findByUserId(userId: string): Promise<AuthSessionEntity> {
    const target = await this.authSessionRepo.findOneBy({userId})
    if (!target) {
      throw new NotFoundException(`Auth session with user id: ${userId} not found`);
    }
    return target;
  }

  async createOne(dto: CreateAuthSessionDto): Promise<AuthSessionEntity> {
    const monthInMilliseconds = 1000 * 60 * 60 * 24 * 30;
    const expiresAt = Date.now() + monthInMilliseconds
    const refreshToken = this.jwtService.sign({sub: dto.userId, options: {expiresIn: expiresAt}});
    const salt = await bcrypt.genSalt(12)
    const refreshTokenHash = await bcrypt.hash(refreshToken, salt)
    const authSession = await this.authSessionRepo.create({...dto, expiresAt: new Date(expiresAt), refreshTokenHash})
    await this.authSessionRepo.save(authSession);
    this.eventsClient.send({cmd: 'events.microservice: createOne'}, {
      domain: "auth",
      action: "created",
      subjectId: dto.userId
    });
    return authSession;
  }

  async refreshAccessToken(accessToken: string): Promise<AccessTokenDto> {
    const payload = this.jwtService.decode(accessToken);
    return await this.generateAccessToken(payload.sub)
  }

  async generateAccessToken(userId: string): Promise<AccessTokenDto> {
    const authSession = await this.findByUserId(userId);
    if (!authSession) {
      throw new UnauthorizedException(`Auth session with user id: ${userId} not found`);
    }
    if (authSession.expiresAt.getTime() < Date.now()) {
      await this.authSessionRepo.delete(authSession.id)
      throw new UnauthorizedException("Auth session is expired");
    }
    const thirtyMinutesInMilliseconds = 1000 * 60 * 30;
    const expiresAt = Date.now() + thirtyMinutesInMilliseconds;
    const accessToken = this.jwtService.sign({sub: userId, options: {expiresIn: expiresAt}});
    return {accessToken};
  }

  async signUp(dto: SignUpDto): Promise<AccessTokenDto> {
    const user: UserDto = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: createOne"}, {dto}))
    await this.createOne({userId: user.id, ip: "mock"})
    return await this.generateAccessToken(user.id)
  }

  async signIn(dto: SignInDto): Promise<AccessTokenDto> {
    const user: UserDto = await firstValueFrom(this.usersClient.send({cmd: "users.microservice: findByEmail"}, {email: dto.email}))
    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException("Incorrect email or password");
    }
    await this.createOne({userId: user.id, ip: "mock"})
    return await this.generateAccessToken(user.id)
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
    this.eventsClient.send({cmd: 'events.microservice: createOne'}, {
      domain: "auth",
      action: "deleted",
      subjectId: target.id
    });
    await this.authSessionRepo.delete(id)
  }


}
