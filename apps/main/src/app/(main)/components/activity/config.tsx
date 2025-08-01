import { Empty } from '@easykit/design'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export type Tab = {
  id: string
  title: string
  content: ReactNode
}

export const useTabs = (): Tab[] => {
  const { t } = useTranslation()
  return [
    {
      id: 'todo',
      title: t('待办'),
      content: <Empty text={t('暂无数据')} />,
    },
    {
      id: 'my',
      title: t('指派给我'),
      content: <Empty text={t('暂无数据')} />,
    },
    {
      id: 'done',
      title: t('已完成'),
      content: <Empty text={t('暂无数据')} />,
    },
    {
      id: 'star',
      title: t('收藏'),
      content: <Empty text={t('暂无数据')} />,
    },
  ]
}
