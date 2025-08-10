'use client'

import { InviteButton } from './invite/button'
import { getColumns, getFilters, getRowActions } from './table'
import { getTabs } from './tabs'

import { useState } from 'react'
import { BreadcrumbItem, BreadcrumbPage, Card, DataTable } from '@easykit/design'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { MainPage } from '@clover/public/components/common/page'
import { PageHeader } from '@clover/public/components/common/page/header'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { useModule } from '@/hooks/use.module'
import { list, type MemberQuery } from '@/rest/member'
import type { Member } from '@/types/module/member'

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
      <PageHeader>
        <ModuleBreadcrumb>
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </ModuleBreadcrumb>
        <TitleBar actions={actions} border={false} title={title} />
        <TabsTitle active={active} className="-mb-md" items={getTabs()} onChange={setActive} />
      </PageHeader>
      <div className="container">
        <Card>
          <DataTable<Member>
            columns={getColumns()}
            data={data}
            filter={{
              items: getFilters(),
              defaultValues: initialParams,
              query: query,
            }}
            inCard={true}
            load={load}
            loading={loading}
            onRowActionClick={({ id: key }, { original }) => {
              const { id } = original
              console.log(key, id)
            }}
            pagination={pagination}
            rowActions={getRowActions()}
          />
        </Card>
      </div>
    </MainPage>
  )
}
