import {CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column} from "typeorm";
import {Action, Domain} from "../dto/create-event.dto";

@Entity()
class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({enum: Domain, type: "simple-enum"})
  domain: Domain;

  @Column({enum: Action, type: "simple-enum"})
  action: Action;

  @Column({name: "actor_id"})
  actorId: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}

export default Event;
