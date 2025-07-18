'use client';

import type { MainLayoutProps } from '@/components/layout/main'
import { toItems } from '@/components/pages/access/authority/form/utils'
import {RoleStatus} from "@/components/pages/access/role/status";
import type { AccessRole } from '@/types/module/access/role'
import { TitleBar } from '@clover/public/components/common/title-bar'
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import { t } from '@clover/public/locale'
import { Form, FormItem, Tree, ValueFormatter } from '@easykit/design'
import type { FC } from 'react'

export type RoleDetailPageProps = {
    data: AccessRole;
}

const RoleDetailPage: FC<RoleDetailPageProps> = (props) => {
    useLayoutConfig<MainLayoutProps>({
        active: "access.role",
        path: [
            {
                title: t("角色管理"),
                type: "link",
                href: "/admin/access/role",
            },
            {
                title: t("角色详情"),
                type: "item",
            }
        ],
    })
    const { data } = props;

    return <>
        <TitleBar title={t("角色详情")} />
        <Form defaultValues={data}>
            <FormItem name="name" label={t("名称")}>
                <ValueFormatter/>
            </FormItem>
            <FormItem name="description" label={t("描述")}>
                <ValueFormatter/>
            </FormItem>
            <FormItem name="enable" label={t("启用状态")}>
                <RoleStatus/>
            </FormItem>
            <FormItem name="authorities" label={t("关联权限")}>
                <Tree
                    treeData={toItems(data?.authorityTree ?? [])}
                    selectable={false}
                />
            </FormItem>
        </Form>
    </>;
};

export default RoleDetailPage;
