import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "user"})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({unique: true, nullable: false})
    email: string

    @Column({default: ""})
    name: string

}
