import { accountInfoState } from '@clover/public/state/account'
import { Action, Dropdown, type DropdownMenuItemProps } from '@easykit/design'
import { useAtomValue } from 'jotai'
import { Ellipsis, Folder, History, LayoutDashboard, Plus, Settings, Star, User, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CollectPanel } from './panel/collect'
import { ProjectPanel } from './panel/project'
import { RecentPanel } from './panel/recent'

export type SidebarItemProps = {
  id: string
  title?: string
  icon?: ReactNode
  href?: string
  panel?: ReactNode
  panelClassName?: string
  children?: ReactNode
  opened?: boolean
  extra?: ReactNode
  extraHold?: boolean
  dropdownItems?: DropdownMenuItemProps[]
  separator?: boolean
}

export const useSidebarItems = (): SidebarItemProps[] => {
  const { t } = useTranslation()
  const iconSize = 'size-4'
  const account = useAtomValue(accountInfoState)
  const router = useRouter()
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false)

  return [
    {
      id: 'dashboard',
      title: t('您的工作'),
      href: '/',
      icon: <LayoutDashboard className={iconSize} />,
    },
    {
      id: 'recent',
      title: t('最近'),
      icon: <History className={iconSize} />,
      panelClassName: 'w-[480px]',
      panel: <RecentPanel />,
    },
    {
      id: 'favorites',
      title: t('已收藏'),
      icon: <Star className={iconSize} />,
      panelClassName: 'w-[480px]',
      panel: <CollectPanel />,
    },
    {
      id: 'project',
      title: t('项目'),
      icon: <Folder className={iconSize} />,
      children: <ProjectPanel />,
      opened: true,
      extraHold: projectDropdownOpen,
      extra: (
        <div className="flex items-center gap-1">
          <Action
            elType="span"
            className="!p-1"
            onClick={() => {
              router.push('/project/new')
            }}
          >
            <Plus className="size-4" />
          </Action>
          <Dropdown
            side="right"
            align="start"
            open={projectDropdownOpen}
            onOpenChange={setProjectDropdownOpen}
            items={[
              {
                id: 'list',
                type: 'item',
                label: t('管理项目'),
                onItemClick: () => {
                  router.push('/project')
                },
              },
            ]}
            asChild
          >
            <Action elType="span" className="!p-1">
              <Ellipsis className="size-4" />
            </Action>
          </Dropdown>
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
          <Action
            elType="span"
            className="!p-1"
            onClick={() => {
              router.push('/team/new')
            }}
          >
            <Plus className="size-4" />
          </Action>
        </div>
      ),
    },
    {
      id: 'separator',
      separator: true,
    },
    {
      id: 'profile',
      title: t('账号'),
      icon: <User className={iconSize} />,
      dropdownItems: [
        {
          id: 'profile',
          type: 'item',
          label: t('个人资料'),
          onItemClick: () => {
            router.push(`/profile/${account.username}`)
          },
        },
        {
          id: 'security',
          type: 'item',
          label: t('安全设置'),
          onItemClick: () => {
            router.push('/profile/security')
          },
        },
      ],
    },
    {
      id: 'settings',
      title: t('帮助'),
      icon: <Settings className={iconSize} />,
    },
  ]
}