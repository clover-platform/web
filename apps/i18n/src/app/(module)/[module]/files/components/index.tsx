'use client'

import { ModuleBreadcrumb } from '@/components/common/breadcrumb/module'
import type { ModuleLayoutProps } from '@/components/layout/module'
import { type ListBranchQuery, deleteBranch, list } from '@/rest/branch'
import type { Branch } from '@/types/pages/branch'
import { MainPage } from '@clover/public/components/common/page'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useListQuery } from '@clover/public/hooks'
import { BreadcrumbItem, BreadcrumbPage, Card, DataTable, Space, useAlert, useMessage } from '@easykit/design'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MergeBranchModal } from './merge/modal'
import { NewBranchButton } from './new/button'
import { RenameBranchModal } from './rename/modal'
import { ROW_ACTIONS, getColumns, getFilters } from './table'
const initialParams = {
  keyword: '',
}

export const ModuleBranchPage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'files',
  })
  const { module } = useParams()
  const alert = useAlert()
  const msg = useMessage()
  const [renameVisible, setRenameVisible] = useState(false)
  const [branch, setBranch] = useState<Branch | null>(null)
  const [mergeVisible, setMergeVisible] = useState(false)
  const { t } = useTranslation()
  const { loading, data, pagination, load, query, refetch } = useListQuery<Branch, ListBranchQuery>({
    params: {
      module: module as string,
    },
    key: 'module:files',
    action: list,
  })

  const actions = (
    <Space>
      <NewBranchButton onSuccess={load} />
    </Space>
  )

  const title = t('文件')

  return (
    <MainPage>
      <ModuleBreadcrumb>
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </ModuleBreadcrumb>
      <TitleBar title={title} actions={actions} border={false} />
      <Card>
        <DataTable<Branch>
          filter={{
            items: getFilters(),
            defaultValues: initialParams,
            query: query,
          }}
          load={load}
          pagination={pagination}
          columns={getColumns()}
          rowActions={(cell) => ROW_ACTIONS(cell)}
          data={data}
          loading={loading}
          onRowActionClick={({ id: key }, { original }) => {
            if (key === 'delete') {
              alert.confirm({
                title: t('删除分支'),
                description: t('确认删除分支'),
                onOk: async () => {
                  const { success, message } = await deleteBranch({
                    id: original.id,
                    module: module as string,
                  })
                  if (success) {
                    refetch().then()
                  } else {
                    msg.error(message)
                  }
                  return success
                },
              })
            } else if (key === 'rename') {
              setBranch(original)
              setRenameVisible(true)
            } else if (key === 'merge') {
              setBranch(original)
              setMergeVisible(true)
            }
          }}
        />
      </Card>
      <RenameBranchModal
        visible={renameVisible}
        branch={branch!}
        onCancel={() => {
          setRenameVisible(false)
          setBranch(null)
        }}
        onSuccess={() => {
          setRenameVisible(false)
          setBranch(null)
          refetch().then()
        }}
      />
      <MergeBranchModal
        visible={mergeVisible}
        branch={branch!}
        onCancel={() => {
          setMergeVisible(false)
          setBranch(null)
        }}
        onSuccess={() => {
          setMergeVisible(false)
          setBranch(null)
          refetch().then()
        }}
      />
    </MainPage>
  )
}
