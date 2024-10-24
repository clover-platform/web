'use client';

import {Button, DataTable, Space, useMessage, useAlert} from "@easykit/design";
import {COLUMNS, FILTERS, ROW_ACTIONS} from "@/config/pages/access/role/table";
import Link from "next/link";
import {useTableLoader} from "@easykit/common/hooks";
import {disableRole, enableRole, roleList, deleteRole} from "@/rest/access";
import {useEffect} from "react";
import { useRouter } from "next/navigation";
import {TitleBar} from "@clover/public/components/common/title-bar";
import { t } from '@easykit/common/utils/locale';

const initialParams = {
    keyword: '',
    enable: '2',
}

const RolePage = () => {
    const router = useRouter();
    const [loading, result, query, load] = useTableLoader({
        initialParams,
        action: roleList,
    });
    const alert = useAlert();
    const msg = useMessage();

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <Link href={"/{#LANG#}/admin/access/role/add/"}>
            <Button>{t("新增")}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={t("角色管理")}
            actions={actions}
        />
        <DataTable
            filter={{
                items: FILTERS,
                defaultValues: initialParams,
                query: query,
            }}
            load={load}
            pagination={{
                total: result?.total || 0,
                page: query.page,
                size: query.size,
            }}
            columns={COLUMNS}
            rowActions={ROW_ACTIONS}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                const id = (original as any).id;
                if(key === "detail") {
                    router.push("/{#LANG#}/access/role/detail/?id=" + id);
                }else if(key === "edit") {
                    router.push("/{#LANG#}/access/role/edit/?id=" + id);
                }else if(key === "disable"){
                    alert.confirm({
                        title: t("禁用？"),
                        description: t("是否要禁用当前角色，禁用后，该角色下的所有用户将会被踢出？"),
                        cancelText: t("取消"),
                        okText: t("禁用"),
                        onOk: async () => {
                            const {success, message} = await disableRole(id);
                            if(success) {
                                load && load().then();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    })
                }else if(key === "enable"){
                    alert.confirm({
                        title: t("启用？"),
                        description: t("是否要启用当前角色，用户需要重新登录后，才会生效。"),
                        cancelText: t("取消"),
                        okText: t("启用"),
                        onOk: async () => {
                            const {success, message} = await enableRole(id);
                            if(success) {
                                load && load().then();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    })
                }else if(key === "delete"){
                    alert.confirm({
                        title: t("删除？"),
                        description: t("是否删除改角色，与之关联的用户、权限关联将会删除。"),
                        cancelText: t("取消"),
                        okText: t("删除"),
                        onOk: async () => {
                            const {success, message} = await deleteRole(id);
                            if(success) {
                                load && load().then();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    })
                }
            }}
        />
    </>
};

export default RolePage;
