import {Controller} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthSessionEntity} from "./entities/auth-session.entity";
import {AccessTokenDto} from "./dto/access-token.dto";
import {SignUpDto} from "./dto/sign-up.dto";
import {SignInDto} from "./dto/sign-in.dto";
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @MessagePattern({cmd: "auth.microservice: findAll"})
  async findAll(): Promise<AuthSessionEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({cmd: "auth.microservice: findOne"})
  async findOne(@Payload() payload: { id: string }): Promise<AuthSessionEntity> {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({cmd: "auth.microservice: findOneByUserId"})
  async findByUserId(@Payload() payload: { userId: string }): Promise<AuthSessionEntity> {
    return await this.appService.findByUserId(payload.userId);
  }

  @MessagePattern({cmd: "auth.microservice: refreshAccessToken"})
  async refreshAccessToken(@Payload() payload: { accessToken: string }): Promise<AccessTokenDto> {
    return await this.appService.refreshAccessToken(payload.accessToken);
  }

  @MessagePattern({cmd: "auth.microservice: signUp"})
  async signUp(@Payload() payload: { dto: SignUpDto }): Promise<AccessTokenDto> {
    return await this.appService.signUp(payload.dto);
  }

  @MessagePattern({cmd: "auth.microservice: signIn"})
  async signIn(@Payload() payload: { dto: SignInDto }): Promise<AccessTokenDto> {
    return await this.appService.signIn(payload.dto);
  }

  @EventPattern({cmd: "auth.microservice: logOut"})
  async logOut(@Payload() payload: { accessToken: string }): Promise<void> {
    return await this.appService.logout(payload.accessToken);
  }
}
