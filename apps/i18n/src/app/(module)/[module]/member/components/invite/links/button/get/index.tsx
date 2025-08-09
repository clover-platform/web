import type { FC } from 'react'
import { Button, useMessage } from '@easykit/design'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { useModule } from '@/hooks/use.module'
import { generate } from '@/rest/member.invite'
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
      const url = `${window.location.origin}/invite/?t=${data}`
      copy(url)
      msg.success(t('邀请链接已复制'))
      queryClient.invalidateQueries({ queryKey: ['member:invite:list', m] })
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  return (
    <Button disabled={props.disabled} loading={loading} onClick={() => doGenerate()} type="button" variant="outline">
      {t('获取链接')}
    </Button>
  )
}
