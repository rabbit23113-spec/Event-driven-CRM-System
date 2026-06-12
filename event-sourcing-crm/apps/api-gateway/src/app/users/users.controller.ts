import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe, ParseUUIDPipe,
  Patch,
  Post, UseGuards,
} from '@nestjs/common';
import {UsersService} from './users.service';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {UserDto} from "../dto/users/user.dto";
import {CreateUserDto, Role} from "../dto/users/create-user.dto";
import {UpdateUserDto} from "../dto/users/update-user.dto";
import {FindByEmailDto} from "../dto/users/find-by-email.dto";
import {JwtGuard} from "../guards/jwt/jwt.guard";
import {CurrentUser} from "../decorators/current-user.decorator";

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
  async findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<UserDto> {
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
  @ApiResponse({status: 200, type: UserDto})
  @Get("find/email")
  async findOneByEmail(@Body("email") dto: FindByEmailDto): Promise<UserDto> {
    return await this.usersService.findOneByEmail(dto.email);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Create user"})
  @ApiResponse({status: 201, type: UserDto})
  @Post("create")
  async createUser(@Body() body: CreateUserDto, @CurrentUser() actorId: string): Promise<UserDto> {
    return await this.usersService.createUser(body, actorId);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Update user"})
  @ApiResponse({status: 204})
  @Patch("update")
  async updateOne(@Body() body: UpdateUserDto, @CurrentUser() actorId: string): Promise<void> {
    await this.usersService.updateUser(body, actorId);
  }

  @UseGuards(JwtGuard)
  @ApiOperation({summary: "Delete user"})
  @ApiResponse({status: 204})
  @Delete("delete/:id")
  async deleteOne(@Param("id", new ParseUUIDPipe()) id: string, @CurrentUser() actorId: string): Promise<void> {
    await this.usersService.deleteUser(id, actorId);
  }
}
