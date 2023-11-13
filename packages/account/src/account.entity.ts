import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "用户名",
        length: 32
    }) username: string;

    @Column({
        comment: "密码",
        length: 255,
        nullable: true
    }) password: string;

    @Column({
        comment: "状态: 0 未激活 1 正常 2 禁用",
        default: 0
    }) status: number;

    @Column({
        comment: "是否已删除",
        default: false
    }) deleted: boolean;

    @Column({
        comment: "创建时间",
    }) createTime: Date;

    @Column({
        comment: "OTP密钥",
        nullable: true
    }) otpSecret: string;

    @Column({
        comment: "OTP绑定状态: 0 未绑定 1 已绑定",
        nullable: true
    }) otpStatus: number;
}
