'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t, tt} from '@clover/public/locale';
import {TitleBar} from "@clover/public/components/common/title-bar";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  DataTable, useAlert, useMessage
} from "@easykit/design";
import Link from "next/link";
import {useTableLoader} from "@clover/public/hooks";
import {list} from "@/rest/project";
import {getColumns, getFilters, getRowActions, getTabs} from "@/config/pages/project/table";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {MainLayoutProps} from "@/components/layout/main";
import {useRouter, useSearchParams} from "next/navigation";
import {DASHBOARD_URL} from "@/config/route";
import {MainPage} from "@clover/public/components/common/page";
import {Project} from "@clover/public/types/project";
import {deleteProject, addCollect, cancelCollect} from "@/rest/project";
import {useCurrentProject} from "@clover/public/components/layout/hooks/main";
import {useCollectProject} from "@/hooks/use.collect.project";

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
  const router = useRouter();
  const [loading, result, query, load] = useTableLoader<Project>({
    initialParams,
    action: list,
    keys: ['type'],
  });
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [active, setActive] = useState(type || "all");
  const alert = useAlert();
  const project = useCurrentProject();
  const msg = useMessage();
  const { load: loadCollect } = useCollectProject();

  useEffect(() => {
    load({type:active}).then();
  }, [active, load]);

  const reload = useCallback(() => {
    load().then();
    loadCollect().then();
  }, [load, loadCollect])

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
        columns={getColumns(project?.id)}
        rowActions={(row) => getRowActions(row, project?.id)}
        data={result?.data || []}
        loading={loading}
        onRowActionClick={({id: key}, {original}) => {
          const {id, projectKey} = original;
          if(key === "delete") {
            alert.confirm({
              title: t("删除项目"),
              description: <>
                {t("确定删除项目吗？")}
              </>,
              onOk: async () => {
                const { success, message } = await deleteProject(id);
                if(success) {
                  reload();
                }else{
                  msg.error(message);
                }
              }
            })
          }else if(["info", "member"].includes(key)) {
            router.push(`/project/${projectKey}?tab=${key}`);
          }else if(key === "collect") {
            alert.confirm({
              title: t("收藏项目"),
              description: t("确定收藏项目吗？"),
              onOk: async () => {
                const { success } = await addCollect(id);
                if(success) {
                  reload();
                }
              }
            })
          }else if(key === "collect.cancel") {
            alert.confirm({
              title: t("取消收藏项目"),
              description: t("确定取消收藏项目吗？"),
              onOk: async () => {
                const { success } = await cancelCollect(id);
                if(success) {
                  reload();
                }
              }
            })
          }
        }}
      />
    </Card>
  </MainPage>
};

export default ProjectPage;
