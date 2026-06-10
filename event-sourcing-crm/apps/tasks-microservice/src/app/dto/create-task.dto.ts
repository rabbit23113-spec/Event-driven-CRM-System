import {Priority} from "../entities/task.entity";

export class CreateTaskDto {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: Date;
  assigneeId: string;
  relatedLeadId?: string;
  relatedClientId?: string;
  relatedDeadId?: string;
}
