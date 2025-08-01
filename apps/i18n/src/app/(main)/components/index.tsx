'use client'

import { AppBreadcrumb } from '@/components/common/breadcrumb/app'
import type { MainLayoutProps } from '@/components/layout/main'
import { ROW_ACTIONS, getColumns, getFilters } from '@/config/pages/module/table'
import { getTabs } from '@/config/pages/module/tabs'
import { useReloadCollectModule } from '@/hooks'
import { type ModuleListParams, addCollect, cancelCollect, deleteModule, list } from '@/rest/module'
import type { Module } from '@/types/module'
import { MainPage } from '@clover/public/components/common/page'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { useProfile } from '@clover/public/hooks/use.profile'
import { BreadcrumbItem, BreadcrumbPage, Button, Card, DataTable, Space, useAlert, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  const msg = useMessage()
  const alert = useAlert()
  const reloadCollect = useReloadCollectModule()
  const { loading, data, pagination, load, query } = useListQuery<Module, ModuleListParams>({
    params: {
      type: active,
    },
    key: 'module:list',
    action: list,
  })
  const { mutateAsync } = useMutation({
    mutationFn: deleteModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
      reloadCollect()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const { mutate: addCollectMutation } = useMutation({
    mutationFn: addCollect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
      reloadCollect()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const { mutate: cancelCollectMutation } = useMutation({
    mutationFn: cancelCollect,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['module:list'], exact: false })
      reloadCollect()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const remove = (m: string) => {
    alert.confirm({
      title: t('删除'),
      description: t('删除该翻译项目，所以的翻译数据将无法使用，是否继续？'),
      onOk: async () => {
        try {
          await mutateAsync(m)
          return true
        } catch (_) {
          return false // 或者根据需要返回
        }
      },
    })
  }

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
            const { identifier } = original
            if (key === 'detail') {
              router.push(`/${identifier}/dashboard`)
            } else if (key === 'activity') {
              router.push(`/${identifier}/activity`)
            } else if (key === 'delete') {
              remove(identifier!)
            } else if (key === 'collect') {
              alert.confirm({
                title: t('收藏模块'),
                description: t('确定收藏模块吗？'),
                onOk: () => addCollectMutation(identifier!),
              })
            } else if (key === 'collect.cancel') {
              alert.confirm({
                title: t('取消收藏模块'),
                description: t('确定取消收藏模块吗？'),
                onOk: () => cancelCollectMutation(identifier!),
              })
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
