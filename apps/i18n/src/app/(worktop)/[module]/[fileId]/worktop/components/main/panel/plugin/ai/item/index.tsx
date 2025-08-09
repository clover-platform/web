import { useResultSubmit } from '../../../result/hooks/use.result.submit'

import { type FC, useCallback } from 'react'
import { Spin, Tooltip } from '@easykit/design'
import { ArrowBottomLeftIcon, CheckIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import { Action } from '@clover/public/components/common/action'
import bus from '@clover/public/events'
import { ENTRY_RESULT_AI_INSERT } from '@/events/worktop'
export type AIItemProps = {
  value: string
}

export const AIItem: FC<AIItemProps> = (props) => {
  const [submit, loading] = useResultSubmit()
  const { t } = useTranslation()

  const insert = useCallback((value: string) => {
    bus.emit(ENTRY_RESULT_AI_INSERT, value)
  }, [])

  return (
    <div className="group flex items-center justify-center space-x-1 rounded-lg bg-muted p-3">
      <div className="flex min-h-7 flex-1 items-center justify-start">{props.value}</div>
      <div className="hidden h-7 items-center justify-center space-x-1 group-hover:flex">
        <Tooltip content={t('采用')}>
          <Action className="!p-1" disabled={loading} onClick={() => insert(props.value)}>
            <ArrowBottomLeftIcon />
          </Action>
        </Tooltip>
        <Tooltip content={t('采用并保存')}>
          <Action className="!p-1" disabled={loading} onClick={() => submit(props.value)}>
            {loading ? <Spin /> : <CheckIcon />}
          </Action>
        </Tooltip>
      </div>
    </div>
  )
}
