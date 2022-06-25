import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'auth_session' })
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: true, nullable: false })
  valid: boolean;

  @Column({ default: '' })
  userAgent: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;
}
