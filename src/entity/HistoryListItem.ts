import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { HistoryList } from './HistoryList';

@Entity('history_list_item')
export class HistoryListItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Item)
  item: Item;

  @ManyToOne(() => HistoryList, (list) => list.items)
  history: HistoryList;
}
