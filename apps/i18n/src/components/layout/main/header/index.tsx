import { t } from '@clover/public/utils/locale.client'
import { Action, DropdownMenu, DropdownMenuTrigger } from '@easykit/design'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { type FC, type ReactNode, useMemo, useState } from 'react'
import { Module } from './module'

export type HeaderProps = {
  active?: string
}

export type NavItemConfig = {
  id: string
  title: string
  component?: ReactNode
  href?: string
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

export type NavItemProps = {
  config: NavItemConfig
  active?: string
}

export const NavItem: FC<NavItemProps> = (props) => {
  const { config, active } = props
  const [open, setOpen] = useState(false)
  return (
    <li>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Action className="!py-1 !outline-none space-x-1" active={config.id === active}>
            <span>{config.title}</span>
            <ChevronDownIcon className={open ? 'rotate-180' : ''} />
          </Action>
        </DropdownMenuTrigger>
        <div onClick={() => setOpen(false)}>{config.component}</div>
      </DropdownMenu>
    </li>
  )
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
