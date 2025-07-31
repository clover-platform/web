
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { getTopItems } from './config'
import { SidebarItem } from './item'

export type SidebarProps = {
  active?: string
}

export const Sidebar: FC<SidebarProps> = (props) => {
  const { active } = props
  const { t } = useTranslation()
  const topItems = getTopItems(t)
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex-1 p-sm">
        <ul className="flex flex-col gap-1">
          {topItems.map((item) => (
            <li key={item.id}>
              <SidebarItem {...item} active={active} />
            </li>
          ))}
        </ul>
      </div>
      <div className="border-border border-t p-sm">bottom</div>
    </div>
  )
}
