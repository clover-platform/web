
import { OTPInput } from '@clover/public/components/common/input/otp'
import { t } from '@clover/public/utils/locale.client'
import { Dialog, type DialogProps, Loading } from '@easykit/design'
import { useCallback } from 'react'

type FormData = {
  code: string
}

export type MFADialogProps<T> = DialogProps & {
  onSubmit: (values: T, submitting?: boolean) => void
  formData: T | null
  isPending: boolean
}

export const MFADialog = <T = unknown>(props: MFADialogProps<T>) => {
  const { visible, onCancel, formData, onSubmit, isPending, ...rest } = props

  const onSubmitWrapper = useCallback(
    (data: FormData) => {
      onSubmit(
        {
          ...formData!,
          ...data,
        },
        false
      )
    },
    [formData, onSubmit]
  )

  return (
    <Dialog
      visible={visible}
      onCancel={onCancel}
      title={t('二次验证')}
      maskClosable={false}
      className="!max-w-[340px]"
      {...rest}
    >
      <Loading loading={isPending}>
        <div className="flex flex-col items-center gap-2">
          <OTPInput
            onChange={(code) => {
              if (code.length === 6) {
                onSubmitWrapper({ code })
              }
            }}
          />
          <div className="text-center text-secondary-foreground text-sm">{t('请输入身份验证 App 验证码')}</div>
        </div>
      </Loading>
    </Dialog>
  )
}