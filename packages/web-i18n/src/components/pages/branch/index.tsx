'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { DataTable, Space } from "@atom-ui/core";
import { COLUMNS, FILTERS, ROW_ACTIONS } from "@/config/pages/module/branch/table";
import { useTableLoader } from "@easy-kit/common/hooks";
import { list } from "@/rest/branch";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { NewBranchButton } from "@/components/pages/branch/new/button";

const initialParams = {
    keyword: '',
}

export const ModuleBranchPage = () => {
    const search = useSearchParams();
    const id = search.get('id');
    const [loading, result, query, load] = useTableLoader({
        initialParams: {
            ...initialParams,
            id,
        },
        action: list,
    });

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <NewBranchButton onSuccess={load} />
    </Space>;

    return <>
        <TitleBar
            title={"{#分支#}"}
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
            rowActions={(cell) => ROW_ACTIONS(cell)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {

            }}
        />
    </>
}
