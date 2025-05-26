import SecretItem from "@/components/pages/otp-bind/secret";
import { type OTPBindData, otpBind } from '@/rest/auth'
import {CodeInput} from "@clover/public/components/common/input/code";
import { EmailCodeInput } from '@clover/public/components/common/input/email-code'
import { useFormSubmit } from '@clover/public/hooks/use.form.submit'
import { sendEmailCode } from '@clover/public/rest/common'
import {accountInfoState} from "@clover/public/state/account";
import { t } from '@clover/public/utils/locale.client'
import {CODE} from "@clover/public/utils/regular";
import { Button, Dialog, Form, FormItem } from '@easykit/design'
import { useAtomValue } from 'jotai'
import { type FC, useState } from 'react'
import { useTranslation } from "react-i18next";
import { object, string } from 'zod'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入邮箱验证码')).regex(CODE, t('请输入6位数字验证码')),
    otpCode: string().min(1, t('请输入身份验证 App 验证码')).regex(CODE, t('请输入6位数字验证码')),
  })

export type EnableModalProps = {
  onSuccess?: () => void;
}

export const EnableModal: FC<EnableModalProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const title = t("启用二次验证");
  const account = useAtomValue(accountInfoState);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { ref, submitting, onSubmit } = useFormSubmit<any, OTPBindData>({
    action: otpBind,
    onSuccess: () => {
      setVisible(false)
      props.onSuccess?.()
    },
  })

  return (
    <p>
      <button type="button" onClick={() => setVisible(true)} className="cursor-pointer">
        {title}
      </button>
      <Dialog visible={visible} title={title} maskClosable={false} onCancel={() => setVisible(false)}>
        <Form
          ref={ref}
          defaultValues={{
            email: account.email,
          }}
          onSubmit={onSubmit}
          schema={getSchema()}
        >
          <SecretItem />
          <FormItem
            name="code"
            label={t('邮箱验证码（{{email}}）', {
              email: account.email,
            })}
          >
            <EmailCodeInput placeholder={t('请输入邮箱验证码')} api={sendEmailCode} data={{ action: 'otp-enable' }} />
          </FormItem>
          <FormItem name="otpCode" label={t('验证码')}>
            <CodeInput placeholder={t('请输入身份验证 App 验证码')} />
          </FormItem>
          <Button loading={submitting} type="submit" long>
            {t('启用')}
          </Button>
        </Form>
      </Dialog>
    </p>
  )
}
