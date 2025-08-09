import { type FC, useCallback } from 'react'
import { IconTeam } from '@arco-iconbox/react-clover'
import { Action, Tooltip } from '@easykit/design'
import { ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import type { Module } from '@/types/module'

export type CollectModuleItemProps = {
  module: Module
}

export const CollectModuleItem: FC<CollectModuleItemProps> = (props) => {
  const { module } = props
  const router = useRouter()
  const { t } = useTranslation()

  const onClick = useCallback(() => {
    router.push(`/${module.identifier}/dashboard`)
  }, [router, module.identifier])

  const onWorktopClick = useCallback(() => {
    router.push(`/${module.identifier}/all/worktop`)
  }, [router, module.identifier])

  return (
    <div className="group flex cursor-pointer items-center justify-center space-x-2 rounded-md p-2 hover:bg-secondary">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white" onClick={onClick}>
        <IconTeam />
      </div>
      <div className="flex-1" onClick={onClick}>
        <span>{module.name}</span>
        <span className="ml-1 opacity-60">@{module.identifier}</span>
      </div>
      <div className="hidden group-hover:flex">
        <Tooltip content={t('工作台')}>
          <Action className="!p-1.5" onClick={onWorktopClick}>
            <ArrowUpRight size={16} />
          </Action>
        </Tooltip>
      </div>
    </div>
  )
}
