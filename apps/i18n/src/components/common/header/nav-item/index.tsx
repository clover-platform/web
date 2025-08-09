import { type FC, type ReactNode, useState } from 'react'
import { Action, DropdownMenu, DropdownMenuTrigger } from '@easykit/design'
import { ChevronDownIcon } from '@radix-ui/react-icons'

export type NavItemConfig = {
  id: string
  title: string
  component?: ReactNode
  href?: string
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
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <Action active={config.id === active} className="!py-1 !outline-none space-x-1">
            <span>{config.title}</span>
            <ChevronDownIcon className={open ? 'rotate-180' : ''} />
          </Action>
        </DropdownMenuTrigger>
        <div onClick={() => setOpen(false)}>{config.component}</div>
      </DropdownMenu>
    </li>
  )
}
