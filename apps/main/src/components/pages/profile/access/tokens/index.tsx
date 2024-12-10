'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@clover/public/locale";
import {ProfileLayoutProps} from "@/components/layout/profile";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {Button, DataTable, useAlert, useMessage} from "@easykit/design";
import {useTableLoader} from "@clover/public/hooks";
import {useEffect} from "react";
import {AccessToken} from "@/types/profile/access/token";
import {list, revoke} from "@/rest/profile/access/token";
import {getColumns, getRowActions} from "@/config/pages/profile/access/token";
import Link from "next/link";

const initialParams = {};

export const AccessTokensPage = () => {
    const title = t("访问令牌");
    useLayoutConfig<ProfileLayoutProps>({
        active: "access.tokens",
        path: [
            {
                title,
                type: "item",
            }
        ],
    })

    const [loading, result, query, load] = useTableLoader<AccessToken>({
        initialParams,
        action: list,
        keys: ['type'],
    });
    const alert = useAlert();
    const msg = useMessage();

    useEffect(() => {
        load().then();
    }, []);

    const actions = <div className={"space-x-2"}>
        <Link href={"/profile/-/access/tokens/create"}>
            <Button>{t("创建访问令牌")}</Button>
        </Link>
    </div>;

    return <>
        <TitleBar
            title={title}
            actions={actions}
        />
        <DataTable<AccessToken>
            load={load}
            pagination={{
                total: result?.total || 0,
                page: query.page,
                size: query.size,
            }}
            columns={getColumns()}
            rowActions={(row) => getRowActions(row)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                const {id} = original;
                if("revoke" === key) {
                    alert.confirm({
                        title: t("撤销令牌"),
                        description: t("撤销后将无法再使用该令牌，且该操作无法恢复。"),
                        onOk: async () => {
                            const { success, message } = await revoke(id);
                            if(success) {
                                load().then();
                            }else{
                                msg.error(message);
                            }
                            return success;
                        }
                    });
                }
            }}
        />
    </>
}
