import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

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

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ enum: Status, type: "simple-enum", default: Status.TODO })
  status: Status;

  @Column({ enum: Priority, type: "simple-enum" })
  priority: Priority;

  @Column({ name: "due_date", type: "date", nullable: true })
  dueDate: Date;

  @Column({ name: "assignee_id" })
  assigneeId: string;

  @Column({ name: "related_lead_id", nullable: true })
  relatedLeadId: string;

  @Column({ name: "related_client_id", nullable: true })
  relatedClientId: string;

  @Column({ name: "related_deal_id", nullable: true })
  relatedDealId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
