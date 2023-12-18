import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Assets {
    @PrimaryColumn({
        comment: "主键"
    }) id: string;

    @Column({
        comment: "文件名称",
        length: 255
    }) name: string;

    @Column({
        comment: "内容类型",
        length: 255
    }) contentType: string;

    @Column({
        comment: "文件大小",
    }) length: number;

    @Column({
        comment: "用户ID",
        nullable: true
    }) accountId: number;

    @Column({
        comment: "创建时间",
    }) createTime: Date;

    @Column({
        comment: "是否是临时文件",
        nullable: false,
        default: true,
    }) temporary: boolean;
}
