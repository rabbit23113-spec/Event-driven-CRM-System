import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column({ name: "due_date", type: "datetime", nullable: true })
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
