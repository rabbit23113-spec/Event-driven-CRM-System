import {Status} from "./lead.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsUUID} from "class-validator";

export class CreateLeadDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber("RU")
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  source: string;

  @ApiProperty({enum: Status})
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty()
  @IsUUID()
  ownerId: string;
}
