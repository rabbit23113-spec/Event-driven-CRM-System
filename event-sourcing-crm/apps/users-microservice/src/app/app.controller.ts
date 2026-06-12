import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {UserEntity} from "./entities/user.entity";
import {CreateUserDto, Role} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: "users.microservice: findAll" })
  async findAll(): Promise<UserEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern({ cmd: "users.microservice: findOne" })
  async findOne(@Payload() payload: { id: string }) {
    return await this.appService.findOne(payload.id);
  }

  @MessagePattern({ cmd: "users.microservice: findByRole" })
  async findByRole(@Payload() payload: { role: Role }): Promise<UserEntity[]> {
    return await this.appService.findByRole(payload.role);
  }

  @MessagePattern({ cmd: "users.microservice: findOneByEmail" })
  async findOneByEmail(@Payload() payload: { email: string }) {
    return await this.appService.findOneByEmail(payload.email);
  }

  @MessagePattern({ cmd: "users.microservice: createUser" })
  async createUser(@Payload() payload: { dto: CreateUserDto, actorId: string }) {
    return await this.appService.createUser(payload.dto, payload.actorId);
  }

  @EventPattern({ cmd: "users.microservice: updateOne" })
  async updateOne(@Payload() payload: { dto: UpdateUserDto, actorId: string }) {
    return await this.appService.updateUser(payload.dto, payload.actorId)
  }

  @EventPattern({ cmd: "users.microservice: deleteOne" })
  async deleteOne(@Payload() payload: { id: string, actorId: string }) {
    return await this.appService.deleteUser(payload.id, payload.actorId);
  }
}
