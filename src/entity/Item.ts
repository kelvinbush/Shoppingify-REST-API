import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("item")
class Item {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ default: "" })
  note: string;

  @Column({ default: "" })
  imageUrl: string;
}
