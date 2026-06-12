import {Priority, Status} from "./task.dto";
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";
import {Type} from "class-transformer";


export class UpdateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: Status, required: false })
  @IsNotEmpty()
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ enum: Priority, required: false })
  @IsNotEmpty()
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @ApiProperty({ required: false })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  assigneeId: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  relatedLeadId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  relatedClientId?: string;

  @ApiProperty({ required: false })
  @IsUUID()
  @IsOptional()
  relatedDealId?: string;
}
