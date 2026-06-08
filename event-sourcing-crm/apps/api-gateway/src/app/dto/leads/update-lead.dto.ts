import {Status} from "./lead.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID} from "class-validator";

export class UpdateLeadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber("RU")
  @IsNotEmpty()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source?: string;

  @ApiProperty({ required: false })
  @IsEnum(Status)
  @IsNotEmpty()
  @IsOptional()
  status?: Status;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  ownerId?: string;
}
