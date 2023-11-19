'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem} from "@clover/core";
import Link from "@clover/common/components/link";

const AddRolePage = () => {
    const footer = <Space>
        <Button>{"{#保存#}"}</Button>
        <Button variant={"outline"}>{"{#取消#}"}</Button>
    </Space>
    return <>
        <Breadcrumbs className={"mx-2"}>
            <BreadcrumbsItem>
                <Link href={"/{#LANG#}/access/"}>{"{#角色管理#}"}</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>{"{#添加角色#}"}</BreadcrumbsItem>
        </Breadcrumbs>
        <Card
            className={"w-7/12 mx-auto"}
            footer={footer}
        >
            <h1>添加角色</h1>
        </Card>
    </>;
};

export default AddRolePage;
