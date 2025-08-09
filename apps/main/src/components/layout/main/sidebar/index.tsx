import { useSidebarItems } from './config'
import { SidebarItem } from './item'

import type { FC } from 'react'
import { ScrollArea } from '@easykit/design'
import { LangSelect } from '@clover/public/components/common/select/lang'
import { ThemeSwitcher } from '@clover/public/components/common/theme-switcher'

export type SidebarProps = {
  active?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { active } = props
  const items = useSidebarItems()
  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-0 flex-1">
        <ScrollArea className="h-full">
          <ul className="m-sm flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <SidebarItem {...item} active={active} />
              </li>
            ))}
          </ul>
        </ScrollArea>
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
