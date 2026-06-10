import {Priority} from "./task.dto";
import {IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: Priority })
  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty()
  @IsUUID()
  assigneeId: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  relatedLeadId?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  relatedClientId?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  relatedDealId?: string;
}
