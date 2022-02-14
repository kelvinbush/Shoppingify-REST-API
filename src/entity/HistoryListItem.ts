import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("history_list_item")
class HistoryListItem {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ nullable: false })
    quantity: number;
}
