import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";

export class FindByEmailDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

}
