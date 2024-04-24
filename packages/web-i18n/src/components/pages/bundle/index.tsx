'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {Button, DataTable} from "@atom-ui/core";
import {COLUMNS, ROW_ACTIONS} from "@/config/pages/bundle/table";
import {list} from "@/rest/bundle";
import {Bundle} from "@/types/pages/bundle";
import {useTableLoader} from "@easy-kit/common/hooks";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {IconAdd} from "@arco-iconbox/react-clover";
import Link from "next/link";

const initialParams = {};

export const BundlePage = () => {
    const search = useSearchParams();
    const id = search.get('id');
    const [loading, result, query, load] = useTableLoader({
        initialParams: {
            ...initialParams,
            moduleId: id,
        },
        action: list,
    });

    useEffect(() => {
        load().then();
    }, []);


    const actions = <div>
        <Link href={"/{#LANG#}/i18n/bundle/add/?id=" + id}>
            <Button type={"button"}>
                <IconAdd />
                <span>{"{#添加文件#}"}</span>
            </Button>
        </Link>

    </div>;

    return <>
        <TitleBar
            title={"{#下载#}"}
            actions={actions}
            border={false}
        />
        <DataTable<Bundle>
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
                console.log(key, original);
            }}
        />
    </>
}
