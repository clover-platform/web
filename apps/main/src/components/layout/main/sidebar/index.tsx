
import { LangSelect } from '@clover/public/components/common/select/lang'
import { ThemeSwitcher } from '@clover/public/components/common/theme-switcher'
import type { FC } from 'react'
import { useSidebarItems } from './config'
import { SidebarItem } from './item'

export type SidebarProps = {
  active?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { active } = props
  const items = useSidebarItems()
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 p-sm">
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <SidebarItem {...item} active={active} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex border-border border-t p-sm">
        <ThemeSwitcher size="sm" />
        <div className="flex flex-1 justify-end">
          <LangSelect className="!h-3xl" />
        </div>
      </div>
    </div>
  )
}
