import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AccessAuthority {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "上级ID",
        nullable: true
    }) parentId: number;

    @Column({
        comment: "名称",
        length: 100
    }) name: string;

    @Column({
        comment: "权限码",
        length: 200
    }) key: string;
}

@Entity()
export class AccessAuthorityApi {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "权限ID",
    }) authorityId: number;

    @Column({
        comment: "接口ID",
    }) apiId: number;
}
