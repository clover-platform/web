import { EmailCodeInput } from '@clover/public/components/common/input/email-code'
import { type SendEmailCodeData, sendEmailCode } from '@clover/public/rest/common'
import { accountInfoState } from '@clover/public/state/account'
import { t } from '@clover/public/utils/locale.client'
import { CODE } from '@clover/public/utils/regular'
import { Button, Dialog, Form, FormItem, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai/index'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { object, string } from 'zod'
import { otpDisable } from '../rest'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入邮箱验证码')).regex(CODE, t('请输入6位数字验证码')),
  })

export type DisableModalProps = {
  onSuccess?: () => void
}

export const DisableModal: FC<DisableModalProps> = (props) => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const title = t('禁用二次验证')
  const account = useAtomValue(accountInfoState)
  const m = useMessage()
  const { mutate, isPending } = useMutation({
    mutationFn: otpDisable,
    onSuccess: () => {
      setVisible(false)
      props.onSuccess?.()
    },
    onError: (error) => m.error(error.message),
  })

  return (
    <p>
      <button type="button" onClick={() => setVisible(true)} className="cursor-pointer">
        {title}
      </button>
      <Dialog visible={visible} title={title} maskClosable={false} onCancel={() => setVisible(false)}>
        <Form onSubmit={(data) => mutate(data)} schema={getSchema()}>
          <FormItem
            name="code"
            label={t('邮箱验证码（{{email}}）', {
              email: account.email,
            })}
          >
            <EmailCodeInput<SendEmailCodeData>
              placeholder={t('请输入邮箱验证码')}
              api={sendEmailCode}
              data={{ action: 'otp-disable', email: account.email }}
            />
          </FormItem>
          <Button loading={isPending} type="submit" long>
            {t('禁用')}
          </Button>
        </Form>
      </Dialog>
    </p>
  )
}
