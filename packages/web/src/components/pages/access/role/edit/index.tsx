'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem, useMessage} from "@clover/core";
import Link from "@clover/common/components/link";
import RoleForm from "@/components/pages/access/role/form";
import { useEffect, useState } from "react";
import { addRole, roleDetail } from "@/rest/access";
import {useRouter, useSearchParams} from "next/navigation";
import BackButton from "@clover/common/components/button/back";

const EditRolePage = () => {
    const [loading, setLoading] = useState(false);
    const msg = useMessage();
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get("id");
    const [role, setRole] = useState({});
    const [formKey, setFormKey] = useState(Date.now());

    const load = async () => {
        setLoading(true);
        const { success, data } = await roleDetail(id);
        setLoading(false);
        if(success) {
            setRole(data);
            setFormKey(Date.now());
        }
    }

    useEffect(() => {
        load().then();
    }, []);

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

    console.log(role);

    return <>
        <Breadcrumbs className={"mx-2"}>
            <BreadcrumbsItem>
                <Link href={"/{#LANG#}/access/"}>{"{#角色管理#}"}</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>{"{#编辑角色#}"}</BreadcrumbsItem>
        </Breadcrumbs>
        <Card className={"w-[550px] mx-auto"}>
            <RoleForm
                defaultValues={role}
                key={formKey}
                onSubmit={onSubmit}
            >
                <Space>
                    <Button loading={loading} type={"submit"}>{"{#保存#}"}</Button>
                    <BackButton />
                </Space>
            </RoleForm>
        </Card>
    </>;
};

export default EditRolePage;
