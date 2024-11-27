'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@easykit/common/utils/locale";
import {ProfileLayoutProps} from "@/components/layout/profile";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {DataTable} from "@easykit/design";
import {useTableLoader} from "@easykit/common/hooks";
import {useEffect} from "react";
import {AccessToken} from "@/types/profile/access/token";
import {list} from "@/rest/profile/access/token";
import {getColumns, getRowActions} from "@/config/pages/profile/access/token";
import {CreateButton} from "@/components/pages/profile/access/tokens/create/button";

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

    useEffect(() => {
        load().then();
    }, []);

    const actions = <div className={"space-x-2"}>
        <CreateButton onSuccess={() => load().then()} />
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
                console.log(id);
            }}
        />
    </>
}
