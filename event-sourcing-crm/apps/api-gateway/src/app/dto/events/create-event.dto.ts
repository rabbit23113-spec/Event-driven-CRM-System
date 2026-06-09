import {IsEnum, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export enum Domain {
  LEAD = "lead",
  CLIENT = "client",
  DEAL = "deal",
  TASK = "task",
  AUTH = "auth",
  NOTE = "note",
  USER = "user",
}

export enum Action {
  CREATED = "created",
  UPDATED = "updated",
  DELETE = "deleted",
  STATUS_CHANGED = "status_changed"
}

export class CreateEventDto {
  @ApiProperty({ enum: Domain })
  @IsEnum(Domain)
  domain: Domain;

  @ApiProperty({ enum: Action })
  @IsEnum(Action)
  action: Action;

  @ApiProperty()
  @IsUUID()
  actorId: string;

  @ApiProperty()
  @IsUUID()
  subjectId: string;
}
