import {Inject, Injectable} from '@nestjs/common';
import {RMQ_AUTH_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import type {Cache} from "cache-manager";
import {AuthSessionDto} from "../dto/auth/auth-session.dto";
import {AccessTokenDto} from "../dto/auth/access-token.dto";
import {SignUpDto} from "../dto/auth/sign-up.dto";
import {SignInDto} from "../dto/auth/sign-in.dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AuthService {
  constructor(@Inject(RMQ_AUTH_CLIENT_ID) private readonly client: ClientProxy, @Inject(CACHE_MANAGER) private readonly cache: Cache) {
  }

  async findAll(): Promise<AuthSessionDto[]> {
    const cachedAuthSessions: AuthSessionDto[] | undefined = await this.cache.get(`authSessions:all`)
    if (cachedAuthSessions) {
      return cachedAuthSessions;
    }
    const response = await firstValueFrom(this.client.send({cmd: "auth.microservice: findAll"}, {}))
    await this.cache.set(`authSessions:all`, response);
    return response;
  }

  async findOne(id: string): Promise<AuthSessionDto> {
    const cachedAuthSessions: AuthSessionDto | undefined = await this.cache.get(`authSessions:${id}`)
    if (cachedAuthSessions) {
      return cachedAuthSessions;
    }
    const response = await firstValueFrom(this.client.send({cmd: "auth.microservice: findOne"}, {id}))
    await this.cache.set(`authSessions:${id}`, response);
    return response;
  }

  async findByUserId(userId: string): Promise<AuthSessionDto> {
    const cachedAuthSessions: AuthSessionDto | undefined = await this.cache.get(`authSessions:${userId}`)
    if (cachedAuthSessions) {
      return cachedAuthSessions;
    }
    const response = await firstValueFrom(this.client.send({cmd: "auth.microservice: findOneByUserId"}, {userId}))
    await this.cache.set(`authSessions:${userId}`, response);
    return response;
  }

  async refreshAccessToken(accessToken: string): Promise<AccessTokenDto> {
    return await firstValueFrom(this.client.send({cmd: "auth.microservice: refreshAccessToken"}, {accessToken}))
  }

  async signUp(dto: SignUpDto): Promise<AccessTokenDto> {
    return await firstValueFrom(this.client.send({cmd: "auth.microservice: signUp"}, {dto}))
  }

  async signIn(dto: SignInDto): Promise<AccessTokenDto> {
    return await firstValueFrom(this.client.send({cmd: "auth.microservice: signIn"}, {dto}))
  }

  async logOut(accessToken: string): Promise<void> {
    this.client.emit({cmd: "auth.microservice: logOut"}, {accessToken})
  }
}
