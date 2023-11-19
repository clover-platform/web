'use client';

import {Button, Filters, TableTree} from "@clover/core";
import {FILTERS} from "@/config/pages/access/role/table";
import {useState} from "react";
import AddAuthorityDialog from "@/components/pages/access/authority/dialog/add";

const AuthorityPage = () => {
    const [visible, setVisible] = useState(false);

    return <div>
        <div className={"border-0 border-solid border-b border-secondary pb-2"}>
            <Filters items={FILTERS} />
        </div>
        <div className={"my-2 flex justify-start items-center"}>
            <Button onClick={() => setVisible(true)}>{"{#添加#}"}</Button>
        </div>
        <TableTree />
        <AddAuthorityDialog
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </div>
};

export default AuthorityPage;
