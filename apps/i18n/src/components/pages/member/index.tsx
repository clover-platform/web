'use client';

import { useSearchParams } from "next/navigation";
import { useTableLoader } from "@clover/public/hooks";
import { list } from "@/rest/member";
import { useEffect, useState } from "react";
import { TitleBar } from "@clover/public/components/common/title-bar";
import { DataTable } from "@easykit/design";
import { TabsTitle } from "@clover/public/components/common/tabs-title";
import { getTabs } from "@/config/pages/member/tabs";
import { getColumns, getFilters, getRowActions } from "@/config/pages/member/table";
import { Member } from "@/types/pages/member";
import { InviteButton } from "@/components/pages/member/invite/button";
import { useLayoutConfig } from "@clover/public/components/layout/hooks/use.layout.config";
import { ModuleLayoutProps } from "@/components/layout/module";
import { useModule } from "@/hooks/use.module";
import { useTranslation } from "react-i18next";
const initialParams = {
  keyword: '',
}

export const MemberPage = () => {
  const { t } = useTranslation();
  useLayoutConfig<ModuleLayoutProps>({
    active: "member",
  })
  const search = useSearchParams();
  const m = useModule();
  const type = search.get('type') || 'all';
  const [active, setActive] = useState(type);
  const [loading, result, query, load] = useTableLoader({
    initialParams: {
      ...initialParams,
      module: m,
    },
    action: list,
    keys: ['type'],
  });

  useEffect(() => {
    load({
      type: active,
      page: 1,
    }).then();
  }, [active, load]);

  const actions = <div className={"space-x-2"}>
    <InviteButton />
  </div>

  return <>
    <TitleBar
      title={t("成员")}
      actions={actions}
      border={false}
    />
    <TabsTitle
      active={active}
      items={getTabs()}
      onChange={setActive}
    />
    <DataTable<Member>
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
      rowActions={getRowActions()}
      data={result?.data || []}
      loading={loading}
      onRowActionClick={({ id: key }, { original }) => {
        const { id } = original;
        console.log(key, id);
      }}
    />
  </>
}
