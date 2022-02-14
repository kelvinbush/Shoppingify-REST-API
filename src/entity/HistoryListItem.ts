import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { HistoryList } from "./HistoryList";

@Entity("history_list_item")
export class HistoryListItem {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false })
  quantity: number;

  @ManyToOne(() => Item)
  itemId: Item;

  @ManyToOne(() => HistoryList)
  historyId: HistoryList;
}
