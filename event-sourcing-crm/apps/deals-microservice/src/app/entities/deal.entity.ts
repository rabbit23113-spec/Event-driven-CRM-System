import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export enum Status {
  NEW = "new",
  IN_PROGRESS = "in_progress",
  WON = "won",
  LOST = "lost",
}

@Entity()
export class DealEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "bigint" })
  value: number;

  @Column({ enum: Status, type: "simple-enum" })
  status: Status

  @Column({ name: "client_id" })
  clientId: string;

  @Column({ name: "owner_id" })
  ownerId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
