import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsUUID} from "class-validator";
import {Status} from "./deal.dto";

export class UpdateStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({enum: Status})
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
