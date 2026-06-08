import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length} from "class-validator";

export class UpdateUserDto {
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @Length(8, 48)
  password?: string;
}
