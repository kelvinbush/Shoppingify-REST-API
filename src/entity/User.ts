import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import argon2 from 'argon2';
import { CurrentList } from './CurrentList';
import { HistoryList } from './HistoryList';
import logger from '../utils/logger';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: '' })
  name: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => CurrentList, { eager: true })
  @JoinColumn()
  activeList: CurrentList;

  @OneToMany(() => HistoryList, (hist) => hist.user)
  historyList: HistoryList[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  async comparePassword(candidatePassword: string) {
    logger.info(this.password);
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      logger.error(e.message);
      return false;
    }
  }
}
