import {ApiProperty} from "@nestjs/swagger";

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum Status {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export class TaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ enum: Priority })
  priority: Priority;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  assigneeId: string;

  @ApiProperty()
  relatedLeadId: string;

  @ApiProperty()
  relatedClientId: string;

  @ApiProperty()
  relatedDealId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
