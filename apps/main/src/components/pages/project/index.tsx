'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import { t } from '@clover/public/locale';
import {TitleBar} from "@clover/public/components/common/title-bar";
import {useEffect, useMemo} from "react";
import {Button, DataTable} from "@easykit/design";
import Link from "next/link";
import {useTableLoader} from "@clover/public/hooks";
import {Project} from "@/types/project";
import {list} from "@/rest/project";
import {getColumns, getFilters, getRowActions} from "@/config/pages/project/table";
import {useRouter} from "next/navigation";

const initialParams = {
    teamId: '',
    keyword: '',
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
    });

    useEffect(() => {
        load().then();
    }, []);

    const actions = useMemo(() => {
        return <div className={"space-x-2"}>
            <Link href={"/project/new"}>
                <Button>{t("创建项目")}</Button>
            </Link>
            <Link href={"/team"}>
                <Button variant={"outline"}>{t("团队管理")}</Button>
            </Link>
        </div>
    }, [])

    return <>
        <TitleBar
            title={t("项目")}
            actions={actions}
            border={false}
        />
        <DataTable<Project>
            showHeader={false}
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
