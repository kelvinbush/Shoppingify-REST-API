import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('current')
export class CurrentList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  name: string;
}
