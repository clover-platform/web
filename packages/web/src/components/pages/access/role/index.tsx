'use client';

import {Button, DataTable, Space} from "@clover/core";
import {COLUMNS, FILTERS, ROW_ACTIONS} from "@/config/pages/access/role/table";
import Link from "next/link";
import {useTableLoader} from "@clover/common/hooks";
import {roleList} from "@/rest/access";
import {useEffect} from "react";

const initialParams = {
    keyword: '',
    enable: '',
}

const RolePage = () => {
    const [loading, result, query, load] = useTableLoader({
        initialParams,
        action: roleList,
    });

    useEffect(() => {
        load().then();
    }, []);

    const actions = <Space>
        <Link href={"/{#LANG#}/access/role/add/"}>
            <Button>{"{#新增#}"}</Button>
        </Link>
    </Space>;

    return <DataTable
        filter={{
            items: FILTERS,
            defaultValues: initialParams,
            query: query,
            load: load,
        }}
        columns={COLUMNS}
        rowActions={ROW_ACTIONS}
        data={result?.data || []}
        total={result?.total}
        actions={actions}
        loading={loading}
    />
};

export default RolePage;
