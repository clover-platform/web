'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import {Button, DataTable, Space} from "@easykit/design";
import Link from "next/link";
import {useTableLoader} from "@clover/public/hooks";
import {getColumns, getFilters, ROW_ACTIONS} from "@/config/pages/module/table";
import {list} from "@/rest/module";
import {useEffect, useState} from "react";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {getTabs} from "@/config/pages/module/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import {Module} from "@/types/pages/module";
import {useProfile} from "@clover/public/hooks/use.profile";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import { t } from '@clover/public/locale';

const initialParams = {
    keyword: '',
}

export const ModulePage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "i18n",
        path: [
            {
                title: t("国际化"),
                type: "item",
            }
        ],
    })
    const profile = useProfile();
    const router = useRouter();
    const search = useSearchParams();
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);
    const [loading, result, query, load] = useTableLoader<Module>({
        initialParams,
        action: list,
        keys: ['type'],
    });

    useEffect(() => {
        load({type}).then();
    }, []);

    useEffect(() => {
        load({
            type: active,
            page: 1,
        }).then();
    }, [active]);

    const actions = <Space>
        <Link href={"/i18n/module/create"}>
            <Button>{t("新建")}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={t("国际化")}
            actions={actions}
            border={false}
        />
        <TabsTitle
            active={active}
            items={getTabs()}
            onChange={setActive}
        />
        <DataTable<Module>
            showHeader={false}
            filter={{
                items: getFilters(),
                defaultValues: initialParams,
                query: query,
            }}
            load={load}
            pagination={{
                total: result?.total || 0,
                page: query.page,
                size: query.size,
            }}
            columns={getColumns()}
            rowActions={(row) => ROW_ACTIONS(profile, row)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                const {id} = original;
                if(key === "detail") {
                    router.push(`/i18n/${original.identifier}/dashboard`);
                }else if(key === "activity") {
                    router.push(`/i18n/${original.identifier}/activity`);
                }else if(key === "delete") {

                }
            }}
            onRowClick={(row) => {
                const { identifier } = row.original;
                router.push(`/i18n/${identifier}/dashboard`);
            }}
        />
    </>
}
