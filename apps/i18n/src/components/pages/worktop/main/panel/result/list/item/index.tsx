import { useEntriesUpdater } from '@/components/layout/worktop/hooks'
import { ENTRY_RESULT_EDITOR_RESET, ENTRY_RESULT_RELOAD } from '@/events/worktop'
import { useCurrentBranch } from '@/hooks/use.current.branch'
import { approve as approveRest, deleteResult, removeApproval as removeApprovalRest } from '@/rest/entry.result'
import type { EntryResult } from '@/types/pages/entry'
import { IconDelete } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { TimeAgo } from '@clover/public/components/common/time-ago'
import bus from '@clover/public/events'
import type { RestResult } from '@clover/public/types/rest'
import { Avatar, Badge, Tooltip, useAlert, useMessage } from '@easykit/design'
import { CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type ResultItemProps = {
  item: EntryResult
}

export const ResultItem: FC<ResultItemProps> = (props) => {
  const { item } = props
  const { translator, verifier } = item
  const alert = useAlert()
  const msg = useMessage()
  const { update } = useEntriesUpdater()
  const { module } = useParams()
  const branch = useCurrentBranch()
  const { t } = useTranslation()

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const resultWrapper = async (result: RestResult<any>) => {
    const { success, message } = result
    if (success) {
      bus.emit(ENTRY_RESULT_RELOAD)
      await update(item.entryId)
      bus.emit(ENTRY_RESULT_EDITOR_RESET)
    } else {
      msg.error(message)
    }
    return success
  }

  const deleteItem = () => {
    alert.confirm({
      title: t('删除'),
      description: t('是否删除此翻译'),
      onOk: async () => {
        return resultWrapper(
          await deleteResult({
            module: module as string,
            id: item.id,
            entryId: item.entryId,
            branch: branch?.name || '',
          })
        )
      },
    })
  }

  const approve = () => {
    alert.confirm({
      title: t('批准'),
      description: t('是否批准改翻译作为有效结果'),
      onOk: async () => {
        return resultWrapper(
          await approveRest({
            module: module as string,
            id: item.id,
            entryId: item.entryId,
            branch: branch?.name || '',
          })
        )
      },
    })
  }

  const removeApproval = () => {
    alert.confirm({
      title: t('撤销批准'),
      description: t('是否撤销此翻译的有效结果'),
      onOk: async () => {
        return resultWrapper(
          await removeApprovalRest({
            module: module as string,
            id: item.id,
            entryId: item.entryId,
            branch: branch?.name || '',
          })
        )
      },
    })
  }

  return (
    <div className={classNames('rounded-md border', 'hover:border-primary')}>
      <div className="flex items-start justify-center rounded-t-md bg-muted px-3 py-2">
        <div className="mr-2 flex-1 py-1">{item.content}</div>
        <div className="flex items-center justify-center space-x-1">
          <Tooltip content={item.verified ? t('撤销批准') : t('批准')}>
            <Action onClick={item.verified ? removeApproval : approve} active={item.verified}>
              <CheckIcon />
            </Action>
          </Tooltip>
          <Tooltip content={t('删除')}>
            <Action onClick={deleteItem}>
              <IconDelete className="text-base" />
            </Action>
          </Tooltip>
        </div>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex items-center justify-start space-x-2">
          <div className="flex items-center justify-start">
            <Avatar
              src={translator?.avatar || ''}
              fallback={translator?.username}
              className="mr-1 h-8 w-8 bg-muted-foreground"
            />
            <span className="text-muted-foreground">{translator?.username}</span>
          </div>
          <div className="text-muted-foreground">
            <TimeAgo time={item.updateTime} />
          </div>
        </div>
        {item.verified ? (
          <div className="flex items-center justify-start space-x-2">
            <div className="-mt-3 ml-4 h-5 w-4 rounded-bl-lg border-b border-l" />
            <Badge variant="outline" className="bg-success px-1 text-success-foreground">
              <CheckIcon />
            </Badge>
            <span className="text-success-foreground">{t('已批准')}</span>
            <div className="flex items-center justify-start">
              <Avatar
                src={verifier?.avatar || ''}
                fallback={verifier?.username}
                className="mr-1 h-8 w-8 bg-muted-foreground"
              />
              <span className="text-muted-foreground">{verifier?.username}</span>
            </div>
            <div className="text-muted-foreground">
              <TimeAgo time={item.verifiedTime!} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
