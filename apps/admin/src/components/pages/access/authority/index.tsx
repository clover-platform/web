'use client';

import { TreeTable } from "@easykit/design";
import {useEffect, useState} from "react";
import { COLUMNS } from "@/config/pages/access/authority/table";
import {authorityTree} from "@/rest/access";
import AddAuthorityButton from "@/components/pages/access/authority/button/add";
import TableActions from "@/components/pages/access/authority/table-actions";
import { t } from '@easykit/common/utils/locale'

const AuthorityPage = () => {
    const [tree, setTree] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            setTree(data);
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <>
        <div className={"my-2 flex justify-start items-center mt-3"}>
            <AddAuthorityButton onSuccess={() => load().then()} />
        </div>
        <TreeTable
            loading={loading}
            emptyText={t("暂无权限")}
            columns={[
                ...COLUMNS,
                {
                    key: "actions",
                    label: "",
                    style: {
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    },
                    width: 100,
                    render: (item) => <TableActions
                        onReload={load}
                        item={item}
                    />
                }
            ]}
            data={tree}
        />
    </>
};

export default AuthorityPage;
