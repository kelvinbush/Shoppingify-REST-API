import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "auth_session" })
export class AuthSession {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: true, nullable: false })
  valid: boolean;

  @Column({ default: "" })
  userAgent: string;

  @ManyToOne(() => User)
  user: User;
}
