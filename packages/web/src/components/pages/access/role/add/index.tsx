'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem, useMessage} from "@atom-ui/core";
import Link from "@clover/common/components/link";
import RoleForm from "@/components/pages/access/role/form";
import {useState} from "react";
import {addRole} from "@/rest/access";
import {useRouter} from "next/navigation";
import BackButton from "@clover/common/components/button/back";

const AddRolePage = () => {
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        setLoading(true);
        const { success, message } = await addRole(data);
        setLoading(false);
        if(success) {
            router.push("/{#LANG#}/access/")
        }else{
            msg.error(message);
        }
    }

    return <>
        <Breadcrumbs className={"mx-2"}>
            <BreadcrumbsItem>
                <Link href={"/{#LANG#}/access/"}>{"{#角色管理#}"}</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>{"{#添加角色#}"}</BreadcrumbsItem>
        </Breadcrumbs>
        <Card className={"w-[550px] mx-auto"}>
            <RoleForm onSubmit={onSubmit}>
                <Space>
                    <Button loading={loading} type={"submit"}>{"{#保存#}"}</Button>
                    <BackButton />
                </Space>
            </RoleForm>
        </Card>
    </>;
};

export default AddRolePage;
