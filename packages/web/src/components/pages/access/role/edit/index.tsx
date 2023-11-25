'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem, useMessage, Loading} from "@clover/core";
import Link from "@clover/common/components/link";
import RoleForm from "@/components/pages/access/role/form";
import { useState } from "react";
import { editRole } from "@/rest/access";
import {useRouter, useSearchParams} from "next/navigation";
import BackButton from "@clover/common/components/button/back";
import {useRole} from "@/components/pages/access/role/hooks";

const EditRolePage = () => {
    const [submitting, setSubmitting] = useState(false);
    const msg = useMessage();
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get("id");
    const [role, loading, key] = useRole(Number(id));

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        data.id = id;
        const { success, message } = await editRole(data);
        setSubmitting(false);
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
            <BreadcrumbsItem>{"{#编辑角色#}"}</BreadcrumbsItem>
        </Breadcrumbs>
        <Loading loading={loading}>
            <Card className={"w-[550px] mx-auto"}>
                <RoleForm
                    defaultValues={role}
                    key={key}
                    onSubmit={onSubmit}
                >
                    <Space>
                        <Button loading={submitting} type={"submit"}>{"{#保存#}"}</Button>
                        <BackButton />
                    </Space>
                </RoleForm>
            </Card>
        </Loading>
    </>;
};

export default EditRolePage;
