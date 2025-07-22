import { t } from '@clover/public/utils/locale.client'
import { Space } from '@easykit/design'
import type { ReactNode } from 'react'
import { Entries } from './entries'
import { AddButton } from './entries/button/add'
import { Files } from './files'
import { UploadButton } from './files/button/upload'

export type TabItem = {
  id: string
  title: string
  component: ReactNode
  actions?: ReactNode
}

export const getTabs = (): TabItem[] => {
  return [
    {
      id: 'files',
      title: t('文件'),
      component: <Files />,
      actions: (
        <Space>
          <UploadButton />
        </Space>
      ),
    },
    {
      id: 'entries',
      title: t('词条'),
      component: <Entries />,
      actions: (
        <Space>
          <AddButton />
        </Space>
      ),
    },
  ]
}