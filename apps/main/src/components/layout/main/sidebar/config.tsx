import { Action } from '@easykit/design'
import type { TFunction } from 'i18next'
import { Ellipsis, Folder, History, LayoutDashboard, Plus, Star, Users } from 'lucide-react'
import type { ReactNode } from 'react'

export type SidebarItemProps = {
  id: string
  title: string
  icon: ReactNode
  href?: string
  panel?: ReactNode
  children?: ReactNode
  extra?: ReactNode
}

export const getTopItems = (t: TFunction): SidebarItemProps[] => {
  const iconSize = 'size-5'
  return [
    {
      id: 'dashboard',
      title: t('您的工作'),
      href: '/',
      icon: <LayoutDashboard className={iconSize} />,
    },
    {
      id: 'recent',
      title: t('最近访问'),
      icon: <History className={iconSize} />,
      panel: <div>recent</div>,
    },
    {
      id: 'favorites',
      title: t('已收藏'),
      icon: <Star className={iconSize} />,
      panel: <div>favorites</div>,
    },
    {
      id: 'project',
      title: t('项目'),
      icon: <Folder className={iconSize} />,
      children: <div>projects</div>,
      extra: (
        <div className="flex items-center gap-1">
          <Action elType="span" className="!p-1">
            <Plus className="size-4" />
          </Action>
          <Action elType="span" className="!p-1">
            <Ellipsis className="size-4" />
          </Action>
        </div>
      ),
    },
    {
      id: 'team',
      title: t('团队'),
      icon: <Users className={iconSize} />,
      href: '/team',
      extra: (
        <div className="flex items-center gap-1">
          <Action elType="span" className="!p-1">
            <Plus className="size-4" />
          </Action>
          <Action elType="span" className="!p-1">
            <Ellipsis className="size-4" />
          </Action>
        </div>
      ),
    },
  ]
}
