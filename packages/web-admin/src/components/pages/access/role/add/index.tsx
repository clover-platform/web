'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem, useMessage, Separator} from "@atom-ui/core";
import Link from "@easy-kit/common/components/link";
import RoleForm from "@/components/pages/access/role/form";
import {useState} from "react";
import {addRole} from "@/rest/access";
import {useRouter} from "next/navigation";
import BackButton from "@easy-kit/common/components/button/back";
import {TitleBar} from "@clover/public/components/common/title-bar";

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
        <TitleBar title={"{#添加角色#}"} />
        <div className={"w-[550px] mx-auto"}>
            <RoleForm onSubmit={onSubmit}>
                <Space>
                    <Button loading={loading} type={"submit"}>{"{#保存#}"}</Button>
                    <BackButton />
                </Space>
            </RoleForm>
        </div>
    </>;
};

export default AddRolePage;
