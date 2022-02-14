import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category")
class CategoryItem {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;
}
