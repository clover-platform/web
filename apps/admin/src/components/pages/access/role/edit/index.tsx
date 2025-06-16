'use client';

import type { MainLayoutProps } from '@/components/layout/main'
import RoleForm from '@/components/pages/access/role/form'
import { editRole } from "@/rest/access";
import type { AccessRole } from '@/types/module/access/role'
import BackButton from "@clover/public/components/common/button/back";
import { TitleBar } from '@clover/public/components/common/title-bar'
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import { t } from '@clover/public/locale'
import { Button, Space, useMessage } from '@easykit/design'
import { useParams, useRouter } from 'next/navigation'
import { type FC, useState } from 'react'

export type EditRolePageProps = {
    data: AccessRole;
}

const EditRolePage: FC<EditRolePageProps> = (props) => {
    useLayoutConfig<MainLayoutProps>({
        active: "access.role",
        path: [
            {
                title: t("角色管理"),
                type: "link",
                href: "/admin/access/role",
            },
            {
                title: t("编辑角色"),
                type: "item",
            }
        ],
    })
    const { data } = props;
    const { roleId } = useParams();
    const [submitting, setSubmitting] = useState(false);
    const msg = useMessage();
    const router = useRouter();

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const onSubmit = async (data: any) => {
        setSubmitting(true);
        data.id = roleId;
        const { success, message } = await editRole(data);
        setSubmitting(false);
        if(success) {
            router.push("/admin/access/role")
        }else{
            msg.error(message);
        }
    }

    return <>
        <TitleBar title={t("编辑角色")} />
        <RoleForm
            defaultValues={data}
            onSubmit={onSubmit}
        >
            <Space>
                <Button loading={submitting} type={"submit"}>{t("保存")}</Button>
                <BackButton />
            </Space>
        </RoleForm>
    </>;
};

export default EditRolePage;
