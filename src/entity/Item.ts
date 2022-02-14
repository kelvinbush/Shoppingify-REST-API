import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryItem } from "./CategoryItem";

@Entity("item")
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ default: "" })
  note: string;

  @Column({ default: "" })
  imageUrl: string;

  @ManyToOne(() => CategoryItem)
  categoryId: CategoryItem;
}
