'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {Button, DataTable} from "@easykit/design";
import {COLUMNS, ROW_ACTIONS} from "@/config/pages/bundle/table";
import {list} from "@/rest/bundle";
import {Bundle} from "@/types/pages/bundle";
import {useTableLoader} from "@easykit/common/hooks";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {IconAdd} from "@arco-iconbox/react-clover";
import Link from "next/link";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";

const initialParams = {};

export const BundlePage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "download",
        path: [
            {
                title: t("下载"),
                type: "item",
            }
        ],
    })
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
                <span>{t("添加文件")}</span>
            </Button>
        </Link>

    </div>;

    return <>
        <TitleBar
            title={t("下载")}
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
