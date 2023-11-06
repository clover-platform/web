import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn() id: number;

    @Column() username: string;

    @Column() email: string;

    @Column() password: string;

    @Column() enable: boolean;
}
