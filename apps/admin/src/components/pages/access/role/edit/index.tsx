'use client';

import {Button, Space, useMessage} from "@easykit/design";
import RoleForm from "@/components/pages/access/role/form";
import {FC, useState} from "react";
import { editRole } from "@/rest/access";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import BackButton from "@easykit/common/components/button/back";
import { t } from '@easykit/common/utils/locale';
import {AccessRole} from "@/types/pages/access/role";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {TitleBar} from "@clover/public/components/common/title-bar";

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
