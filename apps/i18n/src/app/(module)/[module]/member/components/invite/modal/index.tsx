import type { MemberInviteFormData } from '@/config/schema/module/member'
import { useModule } from '@/hooks/use.module'
import { send } from '@/rest/member.invite'
import { Button, Dialog, type DialogProps, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MemberInviteForm } from '../form'
import { GetInviteLinkButton } from '../links/button/get'
import { InviteLinkListButton } from '../links/button/list'

export type InviteModalProps = {} & DialogProps

export const InviteModal: FC<InviteModalProps> = (props) => {
  const [invite, setInvite] = useState<MemberInviteFormData>({
    roles: ['3'],
    emails: '',
    content: '',
  })
  const m = useModule()
  const msg = useMessage()
  const { t } = useTranslation()
  const { mutate: onSubmit, isPending: loading } = useMutation({
    mutationFn: send,
    onSuccess: () => {
      msg.success(t('邀请发送成功'))
      props.onCancel?.()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <Dialog {...props} title={t('邀请成员')} maskClosable={false}>
      <MemberInviteForm onSubmit={(data) => onSubmit({ ...data, module: m })} onValuesChange={setInvite}>
        <div className="flex items-center justify-center">
          <div className="flex-1">
            <GetInviteLinkButton roles={invite.roles} disabled={!invite.roles.length} />
            <InviteLinkListButton />
          </div>
          <div>
            <Button loading={loading} type="submit">
              {t('发送邀请')}
            </Button>
          </div>
        </div>
      </MemberInviteForm>
    </Dialog>
  )
}
