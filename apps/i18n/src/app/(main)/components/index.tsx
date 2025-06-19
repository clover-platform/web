'use client'

import { AppBreadcrumb } from '@/components/common/breadcrumb/app'
import type { MainLayoutProps } from '@/components/layout/main'
import { ROW_ACTIONS, getColumns, getFilters } from '@/config/pages/module/table'
import { getTabs } from '@/config/pages/module/tabs'
import { type ModuleListParams, list } from '@/rest/module'
import type { Module } from '@/types/module'
import { MainPage } from '@clover/public/components/common/page'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { useProfile } from '@clover/public/hooks/use.profile'
import { BreadcrumbItem, BreadcrumbPage, Button, Card, DataTable, Space } from '@easykit/design'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
const initialParams = {
  keyword: '',
}

export const ModulePage = () => {
  const { t } = useTranslation()
  useLayoutConfig<MainLayoutProps>({
    active: 'module',
  })
  const profile = useProfile()
  const router = useRouter()
  const search = useSearchParams()
  const type = search.get('type') || 'all'
  const [active, setActive] = useState(type)
  const title = t('模块')
  const { loading, data, pagination, load, query } = useListQuery<Module, ModuleListParams>({
    params: {
      type: active,
    },
    key: 'module:list',
    action: list,
  })

  const actions = (
    <Space>
      <Link href="/module/create">
        <Button>{t('创建模块')}</Button>
      </Link>
    </Space>
  )

  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <TitleBar title={title} actions={actions} border={false} />
      <Card>
        <TabsTitle active={active} items={getTabs()} onChange={setActive} />
        <DataTable<Module>
          showHeader={false}
          inCard={true}
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={(row) => ROW_ACTIONS(profile, row)}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            const { id } = original
            console.log(id)
            if (key === 'detail') {
              router.push(`/${original.identifier}/dashboard`)
            } else if (key === 'activity') {
              router.push(`/${original.identifier}/activity`)
            } else if (key === 'delete') {
              console.log(id)
            }
          }}
          onRowClick={(row) => {
            const { identifier } = row.original
            router.push(`/${identifier}/dashboard`)
          }}
        />
      </Card>
    </MainPage>
  )
}
