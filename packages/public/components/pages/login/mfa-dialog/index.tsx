import { CodeInput } from '@clover/public/components/common/input/code'
import { t } from '@clover/public/utils/locale.client'
import { CODE } from '@clover/public/utils/regular'
import { Button, Dialog, type DialogProps, Form, FormItem } from '@easykit/design'
import { type FC, useCallback, useState } from 'react'
import { object, string } from 'zod'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入身份验证 App 验证码')).regex(CODE, t('请输入6位数字验证码')),
  })

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type FormData = any

export type MFADialogProps = DialogProps & {
  onSubmit: (values: FormData, submitting?: boolean) => Promise<void>
  formData: FormData
}

export const MFADialog: FC<MFADialogProps> = (props) => {
  const { visible, onCancel, formData, onSubmit, ...rest } = props
  const [loading, setLoading] = useState(false)

  const onSubmitWrapper = useCallback(
    async (data: FormData) => {
      setLoading(true)
      await onSubmit(
        {
          ...data,
          ...formData,
        },
        false
      )
      setLoading(false)
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
      <Form onSubmit={onSubmitWrapper} schema={getSchema()}>
        <FormItem name="code" label={t('验证码')}>
          <CodeInput placeholder={t('请输入身份验证 App 验证码')} />
        </FormItem>
        <Button loading={loading} type="submit" long>
          {t('确认')}
        </Button>
      </Form>
    </Dialog>
  )
}