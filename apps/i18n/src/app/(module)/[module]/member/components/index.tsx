'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { useModule } from '@/hooks/use.module'
import { type MemberQuery, list } from '@/rest/member'
import type { Member } from '@/types/module/member'
import { MainPage } from '@clover/public/components/common/page'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { BreadcrumbItem, BreadcrumbPage, Card, DataTable } from '@easykit/design'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteButton } from './invite/button'
import { getColumns, getFilters, getRowActions } from './table'
import { getTabs } from './tabs'

const initialParams = {
  keyword: '',
}

export const MemberPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'member',
  })
  const search = useSearchParams()
  const m = useModule()
  const type = search.get('type') || 'all'
  const [active, setActive] = useState(type)
  const { loading, data, pagination, load, query } = useListQuery<Member, MemberQuery>({
    params: {
      module: m,
      type: active,
    },
    key: 'module:bundle',
    action: list,
  })

  const actions = (
    <div className="space-x-2">
      <InviteButton />
    </div>
  )

  const title = t('成员')

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} actions={actions} border={false} />
      <Card>
        <TabsTitle active={active} items={getTabs()} onChange={setActive} />
        <DataTable<Member>
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={getRowActions()}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            const { id } = original
            console.log(key, id)
          }}
        />
      </Card>
    </MainPage>
  )
}
