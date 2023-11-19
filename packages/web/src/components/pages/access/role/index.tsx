'use client';

import {Button, DataTable, Space} from "@clover/core";
import {COLUMNS, DATA, FILTERS, ROW_ACTIONS} from "@/config/pages/access/role/table";
import Link from "next/link";

const RolePage = () => {
    const actions = <Space>
        <Link href={"/{#LANG#}/access/role/add/"}>
            <Button>新增</Button>
        </Link>
    </Space>;
    return <DataTable
        filters={FILTERS}
        columns={COLUMNS}
        data={DATA}
        actions={actions}
        rowActions={ROW_ACTIONS}
        checkbox={true}
    />
};

export default RolePage;
