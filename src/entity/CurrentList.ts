import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("current")
class CurrentList {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ default: "" })
  name: string;

  @Column({ nullable: false })
  quantity: number;
}
