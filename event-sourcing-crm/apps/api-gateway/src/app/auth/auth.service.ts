import {Inject, Injectable} from '@nestjs/common';
import {RMQ_AUTH_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {AuthSessionDto} from "../dto/auth/auth-session.dto";
import {AccessTokenDto} from "../dto/auth/access-token.dto";
import {SignUpDto} from "../dto/auth/sign-up.dto";
import {SignInDto} from "../dto/auth/sign-in.dto";
import {firstValueFrom} from "rxjs";

@Injectable()
export class AuthService {
  constructor(@Inject(RMQ_AUTH_CLIENT_ID) private readonly client: ClientProxy) {
  }

  async findAll(): Promise<AuthSessionDto[]> {
    return await firstValueFrom(this.client.send({cmd: "auth.microservice: findAll"}, {}))
  }

  async findOne(id: string): Promise<AuthSessionDto> {
    return await firstValueFrom(this.client.send({cmd: "auth.microservice: findOne"}, {id}))
  }

  async findByUserId(userId: string): Promise<AuthSessionDto> {
    return await firstValueFrom(this.client.send({cmd: "auth.microservice: findOneByUserId"}, {userId}))
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
