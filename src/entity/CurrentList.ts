import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActiveListItem } from './ActiveListItem';

@Entity('current')
export class CurrentList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  name: string;

  @OneToMany(() => ActiveListItem, (item) => item.current, {
    cascade: true,
  })
  items: ActiveListItem[];
}
