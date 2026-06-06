import {CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Column} from "typeorm";
import {Action, Domain} from "../dto/create-event.dto";

@Entity()
class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({enum: Domain})
  domain: Domain;

  @Column({enum: Action})
  action: Action;

  @Column({name: "actor_id"})
  actorId: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}

export default Event;
