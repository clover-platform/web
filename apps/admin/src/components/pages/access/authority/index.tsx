'use client';

import { TreeTable } from "@easykit/design";
import {useEffect, useState} from "react";
import {getColumns} from "@/config/pages/access/authority/table";
import {AuthorityTree, authorityTree} from "@/rest/access";
import AddAuthorityButton from "@/components/pages/access/authority/button/add";
import TableActions from "@/components/pages/access/authority/table-actions";
import { t } from '@easykit/common/utils/locale'
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {TitleBar} from "@clover/public/components/common/title-bar";

const AuthorityPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "access.authority",
        path: [
            {
                title: t("资源管理"),
                type: "item",
            }
        ],
    })
    const [tree, setTree] = useState<AuthorityTree[]>([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            setTree(data!);
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <>
        <TitleBar
            title={t("资源管理")}
            actions={<AddAuthorityButton onSuccess={() => load().then()} />}
        />
        <TreeTable
            loading={loading}
            rowKey={"id"}
            columns={[
                ...getColumns(),
                {
                    dataKey: "id",
                    title: "",
                    className: "w-10",
                    render: (v, item) => <TableActions
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
