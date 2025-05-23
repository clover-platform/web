'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {
  BreadcrumbItem,
  BreadcrumbPage,
  Button,
  Card,
  DataTable,
  Space
} from "@easykit/design";
import Link from "next/link";
import {useTableLoader} from "@clover/public/hooks";
import {getColumns, getFilters, ROW_ACTIONS} from "@/config/pages/module/table";
import {list} from "@/rest/module";
import {useEffect, useState} from "react";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {getTabs} from "@/config/pages/module/tabs";
import {useRouter, useSearchParams} from "next/navigation";
import {Module} from "@/types/pages/module";
import {useProfile} from "@clover/public/hooks/use.profile";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {MainPage} from "@clover/public/components/common/page";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";
import { useTranslation } from "react-i18next";
const initialParams = {
  keyword: '',
}

export const ModulePage = () => {
  const { t } = useTranslation();
  useLayoutConfig<MainLayoutProps>({
    active: "module"
  })
  const profile = useProfile();
  const router = useRouter();
  const search = useSearchParams();
  const type = search.get('type') || 'all';
  const [active, setActive] = useState(type);
  const title = t("模块");
  const [loading, result, query, load] = useTableLoader<Module>({
    initialParams,
    action: list,
    keys: ['type'],
  });

  useEffect(() => {
    load({
      type: active,
      page: 1,
    }).then();
  }, [active, load]);

  const actions = <Space>
    <Link href={"/module/create"}>
      <Button>{t("创建模块")}</Button>
    </Link>
  </Space>;

  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
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
      <DataTable<Module>
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
        rowActions={(row) => ROW_ACTIONS(profile, row)}
        data={result?.data || []}
        loading={loading}
        onRowActionClick={({id: key}, {original}) => {
          const {id} = original;
          console.log(id);
          if (key === "detail") {
            router.push(`/i18n/${original.identifier}/dashboard`);
          } else if (key === "activity") {
            router.push(`/i18n/${original.identifier}/activity`);
          } else if (key === "delete") {

          }
        }}
        onRowClick={(row) => {
          const {identifier} = row.original;
          router.push(`/i18n/${identifier}/dashboard`);
        }}
      />
    </Card>
  </MainPage>
}
