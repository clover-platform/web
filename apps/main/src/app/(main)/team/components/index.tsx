'use client'

import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { useCollectProject } from '@/hooks/use.collect.project'
import { useCollectTeam } from '@/hooks/use.collect.team'
import { type ListParams, addCollect, cancelCollect, deleteTeam, leaveTeam, list } from '@/rest/team'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useCurrentTeam } from '@clover/public/components/layout/hooks/main'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import type { Team } from '@clover/public/types/team'
import { BreadcrumbItem, BreadcrumbPage, Button, Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getColumns, getFilters, getRowActions, getTabs } from './config/table'

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
  const { load: loadProjectCollect } = useCollectProject()
  const team = useCurrentTeam()
  const msg = useMessage()
  const queryClient = useQueryClient()
  const {
    loading: isLoading,
    data,
    pagination,
    load,
    query,
    refetch,
  } = useListQuery<Team, ListParams>({
    params: {
      type: active,
    },
    action: list,
    key: 'team:list',
  })

  const reload = useCallback(() => {
    refetch().then()
    loadCollect().then()
    loadProjectCollect().then()
    queryClient.invalidateQueries({ queryKey: ['project:list'], exact: false })
  }, [refetch, loadCollect, loadProjectCollect, queryClient])

  const { mutate: addCollectMutation, isPending: isAddingCollect } = useMutation({
    mutationFn: addCollect,
    onSuccess: () => {
      reload()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })
  const { mutate: cancelCollectMutation, isPending: isCancellingCollect } = useMutation({
    mutationFn: cancelCollect,
    onSuccess: () => {
      reload()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })
  const { mutate: deleteTeamMutation, isPending: isDeletingTeam } = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      reload()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })
  const { mutate: leaveTeamMutation, isPending: isLeavingTeam } = useMutation({
    mutationFn: leaveTeam,
    onSuccess: () => {
      reload()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const loading = useMemo(() => {
    return isLoading || isAddingCollect || isCancellingCollect || isDeletingTeam || isLeavingTeam
  }, [isLoading, isAddingCollect, isCancellingCollect, isDeletingTeam, isLeavingTeam])

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
          pagination={pagination}
          columns={getColumns(team?.id)}
          rowActions={(t) => getRowActions(t, team?.id)}
          data={data}
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
                onOk: () => deleteTeamMutation(id),
              })
            } else if (['info', 'member'].includes(key)) {
              router.push(`/team/${teamKey}?tab=${key}`)
            } else if (key === 'collect') {
              alert.confirm({
                title: t('收藏团队'),
                description: t('确定收藏团队吗？'),
                onOk: () => addCollectMutation(id),
              })
            } else if (key === 'collect.cancel') {
              alert.confirm({
                title: t('取消收藏团队'),
                description: t('确定取消收藏团队吗？'),
                onOk: () => cancelCollectMutation(id),
              })
            } else if (key === 'leave') {
              alert.confirm({
                title: t('退出团队'),
                description: t('退出团队将会退出团队下的所有项目，确定退出团队吗？'),
                onOk: () => leaveTeamMutation(id),
              })
            }
          }}
        />
      </Card>
    </MainPage>
  )
}
