import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export enum Status {
  NEW = "new",
  CONNECTED = "connected",
  QUALIFIED = "qualified",
  CONVERTED = "converted",
  REJECTED = "rejected",
}

@Entity()
export class LeadEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  source: string;

  @Column({ enum: Status, type: "simple-enum" })
  status: Status;

  @Column({ name: "owner_id" })
  ownerId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
