import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto, Role} from "./dto/create-user.dto";
import bcrypt from "bcryptjs";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class AppService {
  constructor (@InjectRepository(UserEntity) private readonly usersRepo: Repository<UserEntity>) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepo.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    const target = await this.usersRepo.findOneBy({ id });
    if (!target) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    return target;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const target = await this.usersRepo.findOneBy({ email });
    if (!target) {
      throw new NotFoundException(`Cannot find user with email ${email}`);
    }
    return target;
  }

  async findByRole(role: Role): Promise<UserEntity[]> {
    const users = await this.usersRepo.findBy({ role });
    if (!users) {
      throw new NotFoundException(`Cannot find users with role ${role}`);
    }
    return users;
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const salt = 12;
    const passwordHash = await bcrypt.hash(dto.password, salt);
    const user = this.usersRepo.create({ ...dto, passwordHash });
    await this.usersRepo.save(user);
    return user
  }

  async updateUser(dto: UpdateUserDto): Promise<void> {
    const { id, email, firstName, lastName } = dto;
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    await this.usersRepo.update(id, { email, firstName, lastName });
  }

  async deleteUser(id: string): Promise<void> {
    const target = this.findOne(id);
    if (!target) {
      throw new NotFoundException(`Cannot find user with id ${id}`);
    }
    await this.usersRepo.delete(id);
  }
}
