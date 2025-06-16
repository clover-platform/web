'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { type BundleQuery, list } from '@/rest/bundle'
import type { Bundle } from '@/types/pages/bundle'
import { IconAdd } from '@arco-iconbox/react-clover'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { BreadcrumbItem, BreadcrumbPage, Button, Card, DataTable } from '@easykit/design'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { getColumns, getRowActions } from './table'

export const BundlePage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'bundle',
  })
  const { module } = useParams<Record<string, string>>()
  const { loading, data, pagination, load } = useListQuery<Bundle, BundleQuery>({
    params: {
      module: module as string,
    },
    key: 'module:bundle',
    action: list,
  })

  const actions = (
    <div>
      <Link href={`/${module}/bundle/add`}>
        <Button variant="outline" type="button">
          <IconAdd />
          <span>{t('添加文件')}</span>
        </Button>
      </Link>
    </div>
  )

  const title = t('下载')

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} actions={actions} border={false} />
      <Card>
        <DataTable<Bundle>
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={getRowActions()}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            console.log(key, original)
          }}
        />
      </Card>
    </MainPage>
  )
}
