import { useModule } from '@/hooks/use.module'
import { generate } from '@/rest/member.invite'
import { Button, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import copy from 'copy-to-clipboard'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
export type GetInviteLinkButtonProps = {
  disabled: boolean
  roles: string[]
}

export const GetInviteLinkButton: FC<GetInviteLinkButtonProps> = (props) => {
  const m = useModule()
  const msg = useMessage()
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { mutate: doGenerate, isPending: loading } = useMutation({
    mutationFn: () => generate({ module: m, roles: props.roles }),
    onSuccess: (data) => {
      const url = `${window.location.origin}/i18n/invite/?t=${data}`
      copy(url)
      msg.success(t('邀请链接已复制'))
      queryClient.invalidateQueries({ queryKey: ['member:invite:list', m] })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <Button disabled={props.disabled} loading={loading} type="button" variant="outline" onClick={() => doGenerate()}>
      {t('获取链接')}
    </Button>
  )
}
