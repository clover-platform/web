'use client';

import {DataTable} from "@clover/core";
import {COLUMNS, DATA, FILTERS} from "@/config/pages/access/role/table";

const RolePage = () => {
    const actions = [];
    return <div>
        <DataTable filters={FILTERS} columns={COLUMNS} data={DATA} />
    </div>
};

export default RolePage;
