import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {UserDto} from "../dto/users/user.dto";
import {CreateUserDto, Role} from "../dto/users/create-user.dto";
import {UpdateUserDto} from "../dto/users/update-user.dto";
import {isEmail, isUUID} from "class-validator";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiOperation({summary: "Get users"})
  @ApiResponse({status: 200, type: UserDto, isArray: true})
  @Get("find")
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({summary: "Get user by id"})
  @ApiParam({name: "id"})
  @ApiResponse({status: 200, type: UserDto})
  @Get("find/id/:id")
  async findOne(@Param("id") id: string): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({summary: "Get users by role"})
  @ApiParam({name: "role"})
  @ApiResponse({status: 200, type: UserDto})
  @Get("find/role/:role")
  async findByRole(@Param("role", new ParseEnumPipe(Role)) role: Role): Promise<UserDto[]> {
    return await this.usersService.findByRole(role);
  }

  @ApiOperation({summary: "Get user by email"})
  @ApiParam({name: "email"})
  @ApiResponse({status: 200, type: UserDto})
  @Get("find/email/:email")
  async findOneByEmail(@Param("email") email: string): Promise<UserDto> {
    if (!isEmail(email)) throw new BadRequestException("Invalid email");
    return await this.usersService.findOneByEmail(email);
  }

  @ApiOperation({summary: "Create user"})
  @ApiResponse({status: 201, type: UserDto})
  @Post("create")
  async createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return await this.usersService.createUser(body);
  }

  @ApiOperation({summary: "Update user"})
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() body: UpdateUserDto): Promise<void> {
    await this.usersService.updateUser(body);
  }

  @ApiOperation({summary: "Delete user"})
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param("id") id: string): Promise<void> {
    if (!isUUID(id)) throw new BadRequestException("Invalid UUID");
    await this.usersService.deleteUser(id);
  }
}
