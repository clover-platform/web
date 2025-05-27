'use client';

import type { ModuleLayoutProps } from '@/components/layout/module'
import { getColumns, getRowActions } from "@/config/pages/bundle/table";
import { list } from "@/rest/bundle";
import type { Bundle } from '@/types/pages/bundle'
import { IconAdd } from '@arco-iconbox/react-clover'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTableLoader } from "@clover/public/hooks";
import { Button, DataTable } from '@easykit/design'
import Link from 'next/link'
import { useParams } from "next/navigation";
import { useEffect } from 'react'
import { useTranslation } from "react-i18next";
const initialParams = {};

export const BundlePage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'download',
  })
  const { module } = useParams<Record<string, string>>()
  const [loading, result, query, load] = useTableLoader({
    initialParams: {
      ...initialParams,
      module,
    },
    action: list,
  })

  useEffect(() => {
    load().then()
  }, [load])

  const actions = (
    <div>
      <Link href={`/i18n/${module}/bundle/add`}>
        <Button type="button">
          <IconAdd />
          <span>{t('添加文件')}</span>
        </Button>
      </Link>
    </div>
  )

  return (
    <>
      <TitleBar title={t('下载')} actions={actions} border={false} />
      <DataTable<Bundle>
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
          console.log(key, original)
        }}
      />
    </>
  )
}
