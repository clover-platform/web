'use client';

import type { ModuleLayoutProps } from '@/components/layout/module'
import { MergeBranchModal } from '@/components/pages/branch/merge/modal'
import { NewBranchButton } from '@/components/pages/branch/new/button'
import { RenameBranchModal } from '@/components/pages/branch/rename/modal'
import { ROW_ACTIONS, getColumns, getFilters } from '@/config/pages/module/branch/table'
import { deleteBranch, list } from '@/rest/branch'
import type { Branch } from '@/types/pages/branch'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTableLoader } from '@clover/public/hooks'
import { DataTable, Space, useAlert, useMessage } from '@easykit/design'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
const initialParams = {
  keyword: '',
}

export const ModuleBranchPage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'branch',
  })
  const { module } = useParams()
  const [loading, result, query, load] = useTableLoader({
    initialParams: {
      ...initialParams,
      module: module,
    },
    action: list,
  })
  const alert = useAlert()
  const msg = useMessage()
  const [renameVisible, setRenameVisible] = useState(false)
  const [branch, setBranch] = useState<Branch | null>(null)
  const [mergeVisible, setMergeVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    load().then()
  }, [load])

  const actions = (
    <Space>
      <NewBranchButton onSuccess={load} />
    </Space>
  )

  return (
    <>
      <TitleBar title={t('分支')} actions={actions} border={false} />
      <DataTable<Branch>
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
        columns={getColumns()}
        rowActions={(cell) => ROW_ACTIONS(cell)}
        data={result?.data || []}
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
                  load().then()
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
          load().then()
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
          load().then()
        }}
      />
    </>
  )
}
