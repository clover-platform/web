import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class AuthApp {
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

    @Column({
        comment: "获取用户信息",
    }) infoUrl: string;
}


@Entity()
export class AuthOpenUser {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "用户唯一ID",
    }) openId: string;

    @Column({
        comment: "用户名",
    }) username: string;

    @Column({
        comment: "平台",
    }) platform: string;

    @Column({
        comment: "绑定账号 ID",
        nullable: true,
    }) accountId: number;

    @Column({
        comment: "头像",
    }) avatar: string;

    @Column({
        comment: "访问令牌",
    }) accessToken: string;

    @Column({
        comment: "令牌类型",
    }) tokenType: string;

    @Column({
        comment: "创建时间",
    }) createTime: Date;

    @Column({
        comment: "更新时间",
        nullable: true,
    }) updateTime: Date;
}
