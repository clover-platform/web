import { Module } from '@/components/common/header/module'
import { NavItem, type NavItemConfig } from '@/components/common/header/nav-item'
import { t } from '@clover/public/utils/locale.client'
import { Action } from '@easykit/design'
import Link from 'next/link'
import { type FC, useMemo } from 'react'

export type HeaderProps = {
  active?: string
}

export const getNavs = (): NavItemConfig[] => {
  return [
    {
      id: 'module',
      title: t('模块'),
      component: <Module />,
    },
  ]
}

export const Header: FC<HeaderProps> = (props) => {
  const { active } = props
  const items = useMemo(() => {
    return getNavs().map((value) => <NavItem key={value.id} config={value} active={active} />)
  }, [active])
  return (
    <ul className="flex space-x-2">
      {items}
      <li>
        <Link href="/activity">
          <Action className="!py-1 !outline-none space-x-1" active={active === 'activity'}>
            <span>{t('动态')}</span>
          </Action>
        </Link>
      </li>
    </ul>
  )
}
