import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { Min } from 'class-validator';
import { CurrentList } from './CurrentList';

@Entity('active_list_item')
export class ActiveListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Min(1)
  @Column({ nullable: false, default: 1 })
  quantity: number;

  @ManyToOne(() => Item)
  item: Item;

  @ManyToOne(() => CurrentList, (list) => list.items)
  current: CurrentList;
}
