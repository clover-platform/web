import { CodeInput } from '@clover/public/components/common/input/code'
import { EmailCodeInput } from '@clover/public/components/common/input/email-code'
import { type SendEmailCodeData, sendEmailCode } from '@clover/public/rest/common'
import { accountInfoState } from '@clover/public/state/account'
import { t } from '@clover/public/utils/locale.client'
import { CODE } from '@clover/public/utils/regular'
import { Button, Dialog, Form, FormItem, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { object, string } from 'zod'
import { type OTPBindData, otpBind } from '../rest'
import SecretItem from '../secret'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入邮箱验证码')).regex(CODE, t('请输入6位数字验证码')),
    otpCode: string().min(1, t('请输入身份验证 App 验证码')).regex(CODE, t('请输入6位数字验证码')),
  })

export type EnableModalProps = {
  onSuccess?: () => void
}

export const EnableModal: FC<EnableModalProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  const title = t('启用二次验证')
  const account = useAtomValue(accountInfoState)
  const m = useMessage()
  const { mutate, isPending } = useMutation({
    mutationFn: otpBind,
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
        <Form<OTPBindData> onSubmit={(data) => mutate(data)} schema={getSchema()}>
          <SecretItem />
          <FormItem
            name="code"
            label={t('邮箱验证码（{{email}}）', {
              email: account.email,
            })}
          >
            <EmailCodeInput<SendEmailCodeData>
              placeholder={t('请输入邮箱验证码')}
              api={sendEmailCode}
              data={{ action: 'otp-enable', email: account.email }}
            />
          </FormItem>
          <FormItem name="otpCode" label={t('验证码')}>
            <CodeInput placeholder={t('请输入身份验证 App 验证码')} />
          </FormItem>
          <Button loading={isPending} type="submit" long>
            {t('启用')}
          </Button>
        </Form>
      </Dialog>
    </p>
  )
}
