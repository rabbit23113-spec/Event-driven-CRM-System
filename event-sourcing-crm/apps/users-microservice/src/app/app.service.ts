import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto, Role} from "./dto/create-user.dto";
import bcrypt from "bcryptjs";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ClientProxy} from "@nestjs/microservices";
import {RMQ_EVENTS_CLIENT_ID} from "./constants/constants";
import type {Cache} from "cache-manager";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class AppService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>,
              @Inject(RMQ_EVENTS_CLIENT_ID) private readonly eventsClient: ClientProxy,
              @Inject(CACHE_MANAGER) private readonly cache: Cache
              ) {
  }

  async findAll(): Promise<UserEntity[]> {
    const cachedUsers: UserEntity[] | undefined = await this.cache.get("users:all");
    if (cachedUsers) {
      return cachedUsers
    }
    const result = await this.usersRepo.find();
    await this.cache.set("users:all", result);
    return result;
  }

  async findOne(id: string): Promise<UserEntity> {
    const cachedUser: UserEntity | undefined = await this.cache.get(`users:${id}`);
    if (cachedUser) {
      return cachedUser
    }
    const target = await this.usersRepo.findOneBy({id});
    if (!target) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    await this.cache.set(`users:${id}`, target);
    return target;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const cachedUser: UserEntity | undefined = await this.cache.get(`users:${email}`);
    if (cachedUser) {
      return cachedUser
    }
    const target = await this.usersRepo.findOneBy({email});
    if (!target) {
      throw new NotFoundException(`Cannot find user with email ${email}`);
    }
    await this.cache.set(`users:${email}`, target);
    return target;
  }

  async findByRole(role: Role): Promise<UserEntity[]> {
    const cachedUsers: UserEntity[] | undefined = await this.cache.get(`users:${role}`);
    if (cachedUsers) {
      return cachedUsers
    }
    const users = await this.usersRepo.findBy({role});
    if (!users) {
      throw new NotFoundException(`Cannot find users with role ${role}`);
    }
    await this.cache.set(`users:${users}`, users);
    return users;
  }

  async createUser(dto: CreateUserDto, actorId: string): Promise<UserEntity> {
    const salt = 12;
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const user = this.usersRepo.create({...dto, passwordHash});
    await this.usersRepo.save(user);
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "user",
      action: "created",
      subjectId: user.id,
      actorId
    });
    return user
  }

  async updateUser(dto: UpdateUserDto, actorId: string): Promise<void> {
    const {id, email, firstName, lastName} = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "user",
      action: "updated",
      subjectId: target.id,
      actorId
    })
    await this.usersRepo.update(id, {email, firstName, lastName});
  }

  async deleteUser(id: string, actorId: string): Promise<void> {
    const target = await this.findOne(id);
    if (!target) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    this.eventsClient.emit({cmd: 'events.microservice: createOne'}, {
      domain: "user",
      action: "deleted",
      subjectId: target.id,
      actorId
    })
    await this.usersRepo.delete(id);
  }
}
