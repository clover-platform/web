'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import { t } from '@clover/public/locale';
import {TitleBar} from "@clover/public/components/common/title-bar";
import {useEffect, useMemo, useState} from "react";
import {Button, DataTable} from "@easykit/design";
import Link from "next/link";
import {useTableLoader} from "@clover/public/hooks";
import {Project} from "@/types/project";
import {list} from "@/rest/project";
import {getColumns, getFilters, getRowActions, getTabs} from "@/config/pages/project/table";
import {useRouter, useSearchParams} from "next/navigation";
import {TabsTitle} from "@clover/public/components/common/tabs-title";

const initialParams = {
    teamId: '',
    keyword: '',
    type: 'all',
    page: 1,
    size: 20
}

const ProjectPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "project",
        path: [
            {
                title: t("项目"),
                type: "item",
            }
        ],
    })
    const router = useRouter();
    const [loading, result, query, load] = useTableLoader<Project>({
        initialParams,
        action: list,
        keys: ['type'],
    });
    const search = useSearchParams();
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);

    useEffect(() => {
        load({type}).then();
    }, []);

    useEffect(() => {
        load({
            type: active,
            page: 1,
        }).then();
    }, [active]);

    const actions = useMemo(() => {
        return <div className={"space-x-2"}>
            <Link href={"/project/new"}>
                <Button>{t("新建")}</Button>
            </Link>
        </div>
    }, [])

    return <>
        <TitleBar
            title={t("项目")}
            actions={actions}
            border={false}
        />
        <TabsTitle
            active={active}
            items={getTabs()}
            onChange={setActive}
        />
        <DataTable<Project>
            filter={{
                items: getFilters(),
                defaultValues: initialParams,
                query: query,
            }}
            load={load}
            pagination={{
                total: result?.total || 0,
                page: query.page,
                size: query.size,
            }}
            columns={getColumns()}
            rowActions={(row) => getRowActions(row)}
            data={result?.data || []}
            loading={loading}
            onRowActionClick={({id: key}, {original}) => {
                const {id} = original;
                // if(key === "detail") {
                //     router.push(`/i18n/${original.identifier}/dashboard`);
                // }else if(key === "activity") {
                //     router.push(`/i18n/${original.identifier}/activity`);
                // }else if(key === "delete") {
                //
                // }
            }}
            onRowClick={(row) => {
                // const { identifier } = row.original;
                // router.push(`/i18n/${identifier}/dashboard`);
            }}
        />
    </>
};

export default ProjectPage;
