import {Status} from "./lead.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID} from "class-validator";

export class UpdateLeadDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber("RU")
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ required: false })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  ownerId?: string;
}
