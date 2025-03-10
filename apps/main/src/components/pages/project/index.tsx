'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t, tt} from '@clover/public/locale';
import {TitleBar} from "@clover/public/components/common/title-bar";
import {useEffect, useMemo, useState} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  DataTable
} from "@easykit/design";
import Link from "next/link";
import {useTableLoader} from "@clover/public/hooks";
import {list} from "@/rest/project";
import {getColumns, getFilters, getRowActions, getTabs} from "@/config/pages/project/table";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {MainLayoutProps} from "@/components/layout/main";
import {useSearchParams} from "next/navigation";
import {DASHBOARD_URL} from "@/config/route";
import {MainPage} from "@clover/public/components/common/page";
import {Project} from "@clover/public/types/project";

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
  })
  const [loading, result, query, load] = useTableLoader<Project>({
    initialParams,
    action: list,
    keys: ['type'],
  });
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [active, setActive] = useState(type || "all");

  useEffect(() => {
    load({type:active}).then();
  }, [active, load]);

  const actions = useMemo(() => {
    return <div className={"space-x-2"}>
      <Link href={"/project/new"}>
        <Button>{t("新建")}</Button>
      </Link>
    </div>
  }, [])

  return <MainPage>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href={DASHBOARD_URL}>{tt("控制台")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{tt("项目")}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <TitleBar
      title={t("项目")}
      actions={actions}
      border={false}
    />
    <Card className={"shadow-none"}>
      <TabsTitle
        active={active}
        items={getTabs()}
        onChange={setActive}
      />
      <DataTable<Project>
        inCard={true}
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
          console.log(id, key);
          // if(key === "detail") {
          //     router.push(`/i18n/${original.identifier}/dashboard`);
          // }else if(key === "activity") {
          //     router.push(`/i18n/${original.identifier}/activity`);
          // }else if(key === "delete") {
          //
          // }
        }}
        onRowClick={(row) => {
          console.log(row)
          // const { identifier } = row.original;
          // router.push(`/i18n/${identifier}/dashboard`);
        }}
      />
    </Card>
  </MainPage>
};

export default ProjectPage;
