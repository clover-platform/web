'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem, useMessage, Separator} from "@easykit/design";
import Link from "@easykit/common/components/link";
import RoleForm from "@/components/pages/access/role/form";
import {useState} from "react";
import {addRole} from "@/rest/access";
import {useRouter} from "next/navigation";
import BackButton from "@easykit/common/components/button/back";
import {TitleBar} from "@clover/public/components/common/title-bar";
import { t } from '@easykit/common/utils/locale';

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
        <TitleBar title={t("添加角色")} />
        <div className={"w-[550px] mx-auto"}>
            <RoleForm onSubmit={onSubmit}>
                <Space>
                    <Button loading={loading} type={"submit"}>{t("保存")}</Button>
                    <BackButton />
                </Space>
            </RoleForm>
        </div>
    </>;
};

export default AddRolePage;
