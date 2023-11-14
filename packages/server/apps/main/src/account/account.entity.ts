import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {Account} from "@easy-kit/account/account.entity";

@Entity()
export class AppAccount {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "邮箱",
        length: 255
    }) email: string;

    @Column({
        comment: "用户名",
        length: 32
    }) username: string;

    @Column({
        comment: "头像",
        length: 255,
        nullable: true
    }) avatar: string;

    @Column({
        comment: "是否已删除",
        default: false
    }) deleted: boolean;

    account: Account;
}
