'use client'
import { AppBreadcrumb } from '@/components/common/app-breadcrumb'
import { MainPage } from '@/components/common/main-page'
import type { MainLayoutProps } from '@/components/layout/main'
import { useCollectProject } from '@/hooks/use.collect.project'
import { type ProjectListParams, addCollect, cancelCollect, deleteProject, leaveProject, list } from '@/rest/project'
import { TabsTitle } from '@clover/public/components/common/tabs-title'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import type { Project } from '@clover/public/types/project'
import { BreadcrumbItem, BreadcrumbPage, Button, Card, DataTable, useAlert, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getColumns, getFilters, getRowActions, getTabs } from './config/table'

const initialParams = {
  teamId: '',
  keyword: '',
  type: 'all',
  page: 1,
  size: 20,
}

const ProjectPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<MainLayoutProps>({
    active: 'project',
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [active, setActive] = useState(type || 'all')
  const alert = useAlert()
  const msg = useMessage()
  const { load: loadCollect } = useCollectProject()
  const {
    loading: loadingList,
    data,
    pagination,
    load,
    query,
    refetch,
  } = useListQuery<Project, ProjectListParams>({
    params: {
      type: active,
    },
    key: 'project:list',
    action: list,
  })
  const { mutate: deleteProjectMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      reload()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })
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
  const { mutate: leaveProjectMutation, isPending: isLeavingProject } = useMutation({
    mutationFn: leaveProject,
    onSuccess: () => {
      reload()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const reload = useCallback(() => {
    refetch().then()
    loadCollect().then()
  }, [refetch, loadCollect])

  const actions = useMemo(() => {
    return (
      <div className="space-x-2">
        <Link href="/project/new">
          <Button>{t('新建')}</Button>
        </Link>
      </div>
    )
  }, [t])

  const loading = useMemo(() => {
    return loadingList || isDeleting || isAddingCollect || isCancellingCollect || isLeavingProject
  }, [loadingList, isDeleting, isAddingCollect, isCancellingCollect, isLeavingProject])

  return (
    <MainPage>
      <AppBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{t('项目')}</BreadcrumbPage>
        </BreadcrumbItem>
      </AppBreadcrumb>
      <TitleBar title={t('项目')} actions={actions} border={false} />
      <Card className="shadow-none">
        <TabsTitle active={active} items={getTabs()} onChange={setActive} />
        <DataTable<Project>
          inCard={true}
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={(row) => getRowActions(row)}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            const { id, projectKey } = original
            if (key === 'delete') {
              alert.confirm({
                title: t('删除项目'),
                description: <>{t('确定删除项目吗？')}</>,
                onOk: () => deleteProjectMutation(id),
              })
            } else if (['info', 'member'].includes(key)) {
              router.push(`/project/${projectKey}?tab=${key}`)
            } else if (key === 'collect') {
              alert.confirm({
                title: t('收藏项目'),
                description: t('确定收藏项目吗？'),
                onOk: () => addCollectMutation(id), 
              })
            } else if (key === 'collect.cancel') {
              alert.confirm({
                title: t('取消收藏项目'),
                description: t('确定取消收藏项目吗？'),
                onOk: () => cancelCollectMutation(id),
              })
            } else if (key === 'leave') {
              alert.confirm({
                title: t('退出项目'),
                description: t('退出后将无法访问项目的所有内容，确定退出吗？'),
                onOk: () => leaveProjectMutation(id),
              })
            }
          }}
        />
      </Card>
    </MainPage>
  )
}

export default ProjectPage
