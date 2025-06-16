import { useModule } from '@/hooks/use.module'
import { revoke } from '@/rest/member.invite'
import type { MemberInvite } from '@/types/module/member'
import { IconDelete } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { Tooltip, ValueFormatter, useAlert, useMessage } from '@easykit/design'
import { CopyIcon } from '@radix-ui/react-icons'
import copy from 'copy-to-clipboard'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MemberRole } from '../../../../../role'

export type InviteLinkItemProps = {
  item: MemberInvite
  onRevoke?: () => void
}

export const InviteLinkItem: FC<InviteLinkItemProps> = (props) => {
  const { item } = props
  const m = useModule()
  const url = `${window.location.origin}/i18n/invite/?t=${item.token}`
  const msg = useMessage()
  const alert = useAlert()
  const { t } = useTranslation()

  const doRevoke = () => {
    alert.confirm({
      title: t('确认撤销'),
      description: t('撤销后，该邀请链接将失效，是否继续？'),
      onOk: async () => {
        const { success, message } = await revoke({
          module: m,
          id: item.id,
        })
        if (success) {
          msg.success(t('撤销成功'))
          props.onRevoke?.()
        } else {
          msg.error(message)
        }
        return success
      },
    })
  }

  return (
    <div className="space-y-2">
      <div className="text-muted-foreground">
        <ValueFormatter value={item.createTime} formatters={['time']} />
      </div>
      <div className="flex items-stretch justify-center rounded-md border">
        <div className="flex w-0 flex-1 flex-shrink-0 items-center truncate rounded-l-md bg-muted px-2 py-1 text-muted-foreground">
          {url}
        </div>
        <div className="border-l p-1">
          <Tooltip content={t('复制')}>
            <Action
              onClick={() => {
                copy(url)
                msg.success(t('复制成功'))
              }}
              className="!p-0 h-8 w-8"
            >
              <CopyIcon />
            </Action>
          </Tooltip>
        </div>
        <div className="border-l p-1">
          <Tooltip content={t('撤销')}>
            <Action onClick={doRevoke} className="!p-0 h-8 w-8">
              <IconDelete />
            </Action>
          </Tooltip>
        </div>
      </div>
      <div className="space-x-2">
        {item.roles.map((role) => (
          <MemberRole key={role} value={Number(role)} />
        ))}
      </div>
    </div>
  )
}
