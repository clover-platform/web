'use client';

import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import type { MainLayoutProps } from '@/components/layout/main'
import { getColumns, getFilters, getRowActions, getTabs } from '@/config/pages/team/table'
import { useCollectTeam } from '@/hooks/use.collect.team'
import { addCollect, cancelCollect, deleteTeam, list } from '@/rest/team'
import { MainPage } from '@clover/public/components/common/page'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useCurrentTeam } from '@clover/public/components/layout/hooks/main'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTableLoader } from '@clover/public/hooks'
import type { Team } from '@clover/public/types/team'
import { BreadcrumbItem, BreadcrumbPage, Button, Card, DataTable, useAlert, useMessage } from '@easykit/design'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const initialParams = {
  keyword: '',
  type: 'all',
  page: 1,
  size: 20,
}

export const TeamPage = () => {
  const { t } = useTranslation()
  const title = t('团队')
  useLayoutConfig<MainLayoutProps>({
    active: 'team',
  })
  const [loading, result, query, load] = useTableLoader<Team>({
    initialParams,
    action: list,
    keys: ['type'],
  })
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [active, setActive] = useState(type || 'all')
  const alert = useAlert()
  const router = useRouter()
  const actions = useMemo(() => {
    return (
      <div className="space-x-2">
        <Link href="/team/new">
          <Button>{t('新建')}</Button>
        </Link>
      </div>
    )
  }, [t])
  const { load: loadCollect } = useCollectTeam()
  const team = useCurrentTeam()
  const msg = useMessage()

  useEffect(() => {
    load({ type: active }).then()
  }, [active, load])

  const reload = useCallback(() => {
    load().then()
    loadCollect().then()
  }, [load, loadCollect])

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
          columns={getColumns(team?.id)}
          rowActions={(t) => getRowActions(t, team?.id)}
          data={result?.data || []}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            const { id, teamKey } = original
            if (key === 'delete') {
              alert.confirm({
                title: t('删除团队'),
                description: (
                  <>
                    {t('团队下的所有项目将会被删除。')}
                    <br />
                    {t('确定删除团队吗？')}
                  </>
                ),
                onOk: async () => {
                  const { success, message } = await deleteTeam(id)
                  if (success) {
                    reload()
                  } else {
                    msg.error(message)
                  }
                },
              })
            } else if (['info', 'member'].includes(key)) {
              router.push(`/team/${teamKey}?tab=${key}`)
            } else if (key === 'collect') {
              alert.confirm({
                title: t('收藏团队'),
                description: t('确定收藏团队吗？'),
                onOk: async () => {
                  const { success } = await addCollect(id)
                  if (success) {
                    reload()
                  }
                },
              })
            } else if (key === 'collect.cancel') {
              alert.confirm({
                title: t('取消收藏团队'),
                description: t('确定取消收藏团队吗？'),
                onOk: async () => {
                  const { success } = await cancelCollect(id)
                  if (success) {
                    reload()
                  }
                },
              })
            }
          }}
        />
      </Card>
    </MainPage>
  )
}
