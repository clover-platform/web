'use client';

import {Button, Card, Space, Breadcrumbs, BreadcrumbsItem, useMessage, Loading, Separator} from "@easykit/design";
import Link from "@easykit/common/components/link";
import RoleForm from "@/components/pages/access/role/form";
import { useState } from "react";
import { editRole } from "@/rest/access";
import {useRouter, useSearchParams} from "next/navigation";
import BackButton from "@easykit/common/components/button/back";
import {useRole} from "@/components/pages/access/role/hooks";
import { t } from '@easykit/common/utils/locale';

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
                <Link href={"/{#LANG#}/access/"}>{t("角色管理")}</Link>
            </BreadcrumbsItem>
            <BreadcrumbsItem>{t("编辑角色")}</BreadcrumbsItem>
        </Breadcrumbs>
        <Separator className={"my-4"} />
        <Loading loading={loading}>
            <div className={"w-[550px] mx-auto"}>
                <RoleForm
                    defaultValues={role}
                    key={key}
                    onSubmit={onSubmit}
                >
                    <Space>
                        <Button loading={submitting} type={"submit"}>{t("保存")}</Button>
                        <BackButton />
                    </Space>
                </RoleForm>
            </div>
        </Loading>
    </>;
};

export default EditRolePage;
