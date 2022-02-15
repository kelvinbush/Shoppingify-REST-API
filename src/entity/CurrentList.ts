import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';

@Entity('current')
export class CurrentList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  name: string;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Item)
  item: Item;
}
