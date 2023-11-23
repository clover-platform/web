import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AccessRole {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "角色名称",
        length: 100
    }) name: string;

    @Column({
        comment: "备注",
        length: 255,
        nullable: true
    }) description: string;

    @Column({
        comment: "是否启用",
        default: true
    }) enable: boolean;
}

@Entity()
export class AccessRoleAuthority {
    @PrimaryGeneratedColumn({
        comment: "主键"
    }) id: number;

    @Column({
        comment: "角色ID",
    }) roleId: number;

    @Column({
        comment: "权限ID",
    }) authorityId: number;
}
