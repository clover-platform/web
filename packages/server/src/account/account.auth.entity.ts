import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity()
export class AccountAuthApp {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "App 名称",
    }) name: string;

    @Column({
        comment: "ID",
    }) clientId: string;

    @Column({
        comment: "密钥",
    }) clientSecret: string;

    @Column({
        comment: "授权地址",
    }) authorizeUrl: string;

    @Column({
        comment: "获取 token 地址",
    }) tokenUrl: string;

    @Column({
        comment: "回调地址",
    }) callbackUrl: string;
}
