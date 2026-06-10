import {Priority, Status} from "../entities/task.entity";

export class UpdateTaskDto {
  id: string;
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  dueDate?: Date;
  assigneeId?: string;
  relatedLeadId?: string;
  relatedClientId?: string;
  relatedDeadId?: string;
}
