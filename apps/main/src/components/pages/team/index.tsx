'use client';

import {MainPage} from "@clover/public/components/common/page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator, Button, Card, DataTable, useAlert
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
import {addCollect, cancelCollect, deleteTeam, list} from "@/rest/team";
import {useRouter, useSearchParams} from "next/navigation";
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
  const alert = useAlert();
  const router = useRouter();
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
        rowActions={getRowActions}
        data={result?.data || []}
        loading={loading}
        onRowActionClick={({id: key}, {original}) => {
          const {id, teamKey} = original;
          if(key === "delete") {
            alert.confirm({
              title: t("删除团队"),
              description: t("确定删除团队吗？"),
              onOk: async () => {
                const { success } = await deleteTeam(id);
                if(success) {
                  load().then();
                }
              }
            })
          }else if(["info", "member"].includes(key)) {
            router.push(`/team/${teamKey}?tab=${key}`);
          }else if(key === "collect") {
            alert.confirm({
              title: t("收藏团队"),
              description: t("确定收藏团队吗？"),
              onOk: async () => {
                const { success } = await addCollect(id);
                if(success) {
                  load().then();
                }
              }
            })
          }else if(key === "collect.cancel") {
            alert.confirm({
              title: t("取消收藏团队"),
              description: t("确定取消收藏团队吗？"),
              onOk: async () => {
                const { success } = await cancelCollect(id);
                if(success) {
                  load().then();
                }
              }
            })
          }
        }}
      />
    </Card>
  </MainPage>
}
