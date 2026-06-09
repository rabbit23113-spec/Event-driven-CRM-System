import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsUUID} from "class-validator";

export class UpdateClientDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsPhoneNumber("RU")
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  companyName?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsUUID()
  @IsOptional()
  ownerId?: string;
}
