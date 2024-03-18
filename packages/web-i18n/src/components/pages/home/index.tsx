'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { Button, DataTable, Space } from "@atom-ui/core";
import Link from "next/link";
import { useTableLoader } from "@easy-kit/common/hooks";
import { COLUMNS, FILTERS, ROW_ACTIONS } from "@/config/pages/home/table";
import { list } from "@/rest/module";
import { useEffect } from "react";

const initialParams = {
    keyword: '',
}

export const HomePage = () => {
    const [loading, result, query, load] = useTableLoader({
        initialParams,
        action: list,
    });

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <Link href={"/{#LANG#}/i18n/module/create/"}>
            <Button>{"{#创建模块#}"}</Button>
        </Link>
    </Space>;

    return <>
        <TitleBar
            title={"{#模块#}"}
            actions={actions}
            border={false}
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

            }}
        />
    </>
}
