import { ENTRY_COMMENT_RELOAD } from '@/events/worktop'
import { useCurrentBranch } from '@/hooks/use.current.branch'
import { deleteComment } from '@/rest/entry.comment'
import type { EntryComment } from '@/types/module/entry'
import { IconDelete } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { TimeAgo } from '@clover/public/components/common/time-ago'
import bus from '@clover/public/events'
import { useProfile } from '@clover/public/hooks/use.profile'
import { Avatar, useAlert, useMessage } from '@easykit/design'
import classNames from 'classnames'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type CommentListItemProps = {
  item: EntryComment
}

export const CommentListItem: FC<CommentListItemProps> = (props) => {
  const { item } = props
  const profile = useProfile()
  const msg = useMessage()
  const alert = useAlert()
  const { module } = useParams()
  const branch = useCurrentBranch()
  const { t } = useTranslation()

  const del = () => {
    alert.confirm({
      title: t('删除'),
      description: t('是否删除该评论？'),
      onOk: async () => {
        const { success, message } = await deleteComment({
          module: module as string,
          entryId: item.entryId,
          id: item.id,
          branch: branch?.name || '',
        })
        if (success) {
          bus.emit(ENTRY_COMMENT_RELOAD)
        } else {
          msg.error(message)
        }
        return success
      },
    })
  }

  return (
    <div className="group relative mx-3 flex items-start justify-center">
      <Avatar className="h-10 w-10" src={item.user?.avatar || ''} fallback={item.user?.username || ''} />
      <div className="ml-1 flex-1">
        <div className="rounded-md bg-muted p-2">
          <div className="text-muted-foreground text-xs">{item.user?.username || ''}</div>
          <div className="mt-1">{item.content}</div>
        </div>
        <div className="mt-1 pl-1 text-muted-foreground text-xs">
          <TimeAgo time={item.createTime} />
        </div>
      </div>
      {profile.id === item.createUserId ? (
        <div
          className={classNames(
            'absolute top-1 right-1 flex items-center justify-center space-x-1 rounded-sm bg-white p-1',
            'hidden group-hover:flex'
          )}
        >
          <Action onClick={del} className="!p-1">
            <IconDelete />
          </Action>
        </div>
      ) : null}
    </div>
  )
}
