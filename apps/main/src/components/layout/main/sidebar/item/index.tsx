import { Action, Popover, PopoverContent, PopoverTrigger } from '@easykit/design'
import classNames from 'classnames'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { type FC, useMemo, useState } from 'react'
import type { SidebarItemProps as SidebarItemPropsConfig } from '../config'

export type SidebarItemProps = SidebarItemPropsConfig & {
  active?: string
}

export const SidebarItem: FC<SidebarItemProps> = (props) => {
  const { active, id, icon, title, extra, panel, children, href } = props
  const [isOpen, setIsOpen] = useState(false)

  const iconContainer = 'size-6 items-center justify-center'

  const action = useMemo(() => {
    return (
      <Action
        onClick={children ? () => setIsOpen(!isOpen) : undefined}
        className="group flex w-full items-center justify-center gap-1 py-1.5"
        active={active === id}
      >
        <div className="flex size-6 items-center justify-center">
          {children ? (
            <>
              <span className={classNames('flex group-hover:hidden', iconContainer)}>{icon}</span>
              <span className={classNames('hidden group-hover:flex', iconContainer)}>
                {isOpen ? <ChevronDown className="size-5" /> : <ChevronRight className="size-5" />}
              </span>
            </>
          ) : (
            <span className={classNames('flex', iconContainer)}>{icon}</span>
          )}
        </div>
        <div className="min-h-6.5 flex-1 truncate text-left leading-6.5">{title}</div>
        <div className="hidden group-hover:block">{extra}</div>
        {panel ? (
          <div className="flex size-6 items-center justify-center">
            <ChevronRight className="size-4" />
          </div>
        ) : null}
      </Action>
    )
  }, [active, id, icon, title, extra, panel, children, isOpen])

  const actionWithHref = useMemo(() => {
    if (!href) return action
    return <Link href={href}>{action}</Link>
  }, [href, action])

  if (panel)
    return (
      <Popover>
        <PopoverTrigger asChild>{action}</PopoverTrigger>
        <PopoverContent side="right" align="start" className="w-[480px]">
          {panel}
        </PopoverContent>
      </Popover>
    )
  if (children)
    return (
      <div>
        {action}
        <div className={classNames(isOpen ? 'block' : 'hidden')}>{children}</div>
      </div>
    )
  return actionWithHref
}
