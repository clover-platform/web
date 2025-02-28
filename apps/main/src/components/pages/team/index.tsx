'use client';

import {MainPage} from "@clover/public/components/common/page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator, Button, Card, DataTable
} from "@easykit/design";
import Link from "next/link";
import {DASHBOARD_URL} from "@/config/route";
import {t, tt} from "@clover/public/locale";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {getColumns, getFilters, getRowActions, getTabs} from "@/config/pages/team/table";
import {useEffect, useMemo, useState} from "react";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {useTableLoader} from "@clover/public/hooks";
import {list} from "@/rest/team";
import {useSearchParams} from "next/navigation";
import {Team} from "@clover/public/types/team";

const initialParams = {
  keyword: '',
  type: 'all',
  page: 1,
  size: 20
}

export const TeamPage = () => {
  const title = tt("团队");
  useLayoutConfig<MainLayoutProps>({
    active: "team",
  })
  const [loading, result, query, load] = useTableLoader<Team>({
    initialParams,
    action: list,
    keys: ['type'],
  });
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [active, setActive] = useState(type || "all");
  const actions = useMemo(() => {
    return <div className={"space-x-2"}>
      <Link href={"/team/new"}>
        <Button>{t("新建")}</Button>
      </Link>
    </div>
  }, [])

  useEffect(() => {
    load({type:active}).then();
  }, [active, load]);

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
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <TitleBar
      title={title}
      actions={actions}
      border={false}
    />
    <Card>
      <TabsTitle
        active={active}
        items={getTabs()}
        onChange={setActive}
      />
      <DataTable<Team>
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
}
