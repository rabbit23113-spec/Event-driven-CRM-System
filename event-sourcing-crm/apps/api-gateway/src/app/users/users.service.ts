import {Inject, Injectable} from '@nestjs/common';
import {RMQ_USERS_CLIENT_ID} from "../constants/constants";
import {ClientProxy} from "@nestjs/microservices";
import {UserDto} from "../dto/users/user.dto";
import {firstValueFrom} from "rxjs";
import {CreateUserDto, Role} from "../dto/users/create-user.dto";
import {UpdateUserDto} from "../dto/users/update-user.dto";

@Injectable()
export class UsersService {
  constructor(@Inject(RMQ_USERS_CLIENT_ID) private readonly client: ClientProxy) {
  }

  async findAll(): Promise<UserDto[]> {
    return await firstValueFrom(this.client.send({cmd: "users.microservice: findAll"}, {}));
  }

  async findOne(id: string): Promise<UserDto> {
    return await firstValueFrom(this.client.send({cmd: "users.microservice: findOne"}, {id}))
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await firstValueFrom(this.client.send({cmd: "users.microservice: findOneByEmail"}, {email}))
  }

  async findByRole(role: Role): Promise<UserDto[]> {
    return await firstValueFrom(this.client.send({cmd: "users.microservice: findByRole"}, {role}))
  }

  async createUser(dto: CreateUserDto, actorId: string): Promise<UserDto> {
    return await firstValueFrom(this.client.send({cmd: "users.microservice: createUser"}, {dto, actorId}))
  }

  async updateUser(dto: UpdateUserDto, actorId: string): Promise<void> {
    this.client.emit({cmd: "users.microservice: updateOne"}, {dto, actorId})
  }

  async deleteUser(id: string, actorId: string): Promise<void> {
    this.client.emit({cmd: "users.microservice: deleteOne"}, {id, actorId})
  }

}
