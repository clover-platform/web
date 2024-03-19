'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { Button, DataTable, Space } from "@atom-ui/core";
import Link from "next/link";
import { useTableLoader } from "@easy-kit/common/hooks";
import { COLUMNS, FILTERS, ROW_ACTIONS } from "@/config/pages/module/table";
import { list } from "@/rest/module";
import {useEffect, useState} from "react";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {TABS} from "@/config/pages/module/tabs";
import { useRouter, useSearchParams } from "next/navigation";

const initialParams = {
    keyword: '',
}

export const ModulePage = () => {
    const router = useRouter();
    const search = useSearchParams();
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);
    const [loading, result, query, load] = useTableLoader({
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
        <Link href={"/{#LANG#}/i18n/module/create/"}>
            <Button>{"{#新建#}"}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={"{#国际化#}"}
            actions={actions}
            border={false}
        />
        <TabsTitle
            active={active}
            items={TABS}
            onChange={setActive}
        />
        <DataTable
            showHeader={false}
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

            }}
            onRowClick={(row) => {
                const {id} = row.original;
                router.push("/{#LANG#}/i18n/module/dashboard/?id=" + id);
            }}
        />
    </>
}
