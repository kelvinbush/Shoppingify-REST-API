import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Item } from './Item';

@Entity('admin_item')
export class AdminItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Item, { onDelete: 'CASCADE' })
  item: Item;
}
