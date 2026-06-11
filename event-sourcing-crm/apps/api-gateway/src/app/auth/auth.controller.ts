import {Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthSessionDto} from "../dto/auth/auth-session.dto";
import {AccessTokenDto} from "../dto/auth/access-token.dto";
import {SignUpDto} from "../dto/auth/sign-up.dto";
import {SignInDto} from "../dto/auth/sign-in.dto";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {BodyAccessTokenDto} from "../dto/auth/body-access-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({summary: "Get auth sessions"})
  @ApiResponse({status: 200, type: AuthSessionDto, isArray: true})
  @Get("find")
  async findAll(): Promise<AuthSessionDto[]> {
    return await this.authService.findAll();
  }

  @ApiOperation({summary: "Get auth session by id"})
  @ApiResponse({status: 200, type: AuthSessionDto})
  @ApiParam({name: "id"})
  @Get("find/id/:id")
  async findOne(@Param("id", new ParseUUIDPipe()) id: string): Promise<AuthSessionDto> {
    return await this.authService.findOne(id);
  }

  @ApiOperation({summary: "Get auth session by user id"})
  @ApiResponse({status: 200, type: AuthSessionDto})
  @ApiParam({name: "id"})
  @Get("find/user/:id")
  async findByUserId(@Param("id", new ParseUUIDPipe()) userId: string): Promise<AuthSessionDto> {
    return await this.authService.findByUserId(userId);
  }

  @ApiOperation({summary: "Refresh access token"})
  @ApiResponse({status: 201, type: AccessTokenDto})
  @Post("refresh")
  async refreshAccessToken(@Body() body: BodyAccessTokenDto): Promise<AccessTokenDto> {
    return await this.authService.refreshAccessToken(body.accessToken);
  }

  @ApiOperation({summary: "Sign up"})
  @ApiResponse({status: 201, type: AccessTokenDto})
  @Post("signup")
  async signUp(@Body() dto: SignUpDto): Promise<AccessTokenDto> {
    return await this.authService.signUp(dto);
  }

  @ApiOperation({summary: "Sign in"})
  @ApiResponse({status: 201, type: AccessTokenDto})
  @Post("signin")
  async signIn(@Body() dto: SignInDto): Promise<AccessTokenDto> {
    return await this.authService.signIn(dto);
  }

  @ApiOperation({summary: "Log out"})
  @ApiResponse({status: 201, type: AccessTokenDto})
  @Delete("refresh")
  async logOut(@Body() body: BodyAccessTokenDto): Promise<void> {
    return await this.authService.logOut(body.accessToken);
  }
}
