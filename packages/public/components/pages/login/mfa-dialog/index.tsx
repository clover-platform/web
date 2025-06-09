import { CodeInput } from '@clover/public/components/common/input/code'
import type { LoginRestData } from '@clover/public/rest/auth'
import { t } from '@clover/public/utils/locale.client'
import { CODE } from '@clover/public/utils/regular'
import { Button, Dialog, type DialogProps, Form, FormItem } from '@easykit/design'
import { type FC, useCallback } from 'react'
import { object, string, type z } from 'zod'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入身份验证 App 验证码')).regex(CODE, t('请输入6位数字验证码')),
  })
type FormData = z.infer<ReturnType<typeof getSchema>>

export type MFADialogProps = DialogProps & {
  onSubmit: (values: LoginRestData, submitting?: boolean) => void
  formData: LoginRestData | null
  isPending: boolean
}

export const MFADialog: FC<MFADialogProps> = (props) => {
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
      className="max-w-[480px]"
      {...rest}
    >
      <Form<FormData> onSubmit={onSubmitWrapper} schema={getSchema()}>
        <FormItem name="code" label={t('验证码')}>
          <CodeInput placeholder={t('请输入身份验证 App 验证码')} />
        </FormItem>
        <Button loading={isPending} type="submit" long>
          {t('确认')}
        </Button>
      </Form>
    </Dialog>
  )
}