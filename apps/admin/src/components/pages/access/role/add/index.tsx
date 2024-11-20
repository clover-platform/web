'use client';

import {Button, Space, useMessage} from "@easykit/design";
import RoleForm from "@/components/pages/access/role/form";
import {useState} from "react";
import {addRole} from "@/rest/access";
import {useRouter} from "next/navigation";
import BackButton from "@easykit/common/components/button/back";
import {TitleBar} from "@clover/public/components/common/title-bar";
import { t } from '@easykit/common/utils/locale';
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";

const AddRolePage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "access.role",
        path: [
            {
                title: t("角色管理"),
                type: "link",
                href: "/admin/access/role",
            },
            {
                title: t("添加角色"),
                type: "item",
            }
        ],
    })
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
        <RoleForm onSubmit={onSubmit}>
            <Space>
                <Button loading={loading} type={"submit"}>{t("保存")}</Button>
                <BackButton />
            </Space>
        </RoleForm>
    </>;
};

export default AddRolePage;
