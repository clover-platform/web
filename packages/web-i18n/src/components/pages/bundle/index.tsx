'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {Button, DataTable} from "@atom-ui/core";
import {IconAdd} from "@arco-iconbox/react-clover";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";
import {COLUMNS, ROW_ACTIONS} from "@/config/pages/bundle/table";
import {list} from "@/rest/branch";
import {Bundle} from "@/types/pages/bundle";
import {useTableLoader} from "@easy-kit/common/hooks";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

const initialParams = {};

export const BundlePage = () => {
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


    const actions = <div>
        <Button>
            <IconAdd {...FIX_ICON_PROPS}/>
            <span>{"{#添加文件#}"}</span>
        </Button>
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

            }}
        />
    </>
}
