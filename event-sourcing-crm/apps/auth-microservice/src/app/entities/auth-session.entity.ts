import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class AuthSessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name: "user_id"})
  userId: string;

  @Column({name: "refresh_token_hash"})
  refreshTokenHash: string;

  @Column({name: "expires_at", type: "date"})
  expiresAt: Date;

  @Column()
  ip: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;
}
