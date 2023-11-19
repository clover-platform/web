import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AccessApi {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "请求路径",
        length: 255
    }) path: string;

    @Column({
        comment: "请求方法",
        length: 10
    }) method: string;
}
