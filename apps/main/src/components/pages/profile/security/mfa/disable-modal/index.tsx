import { otpDisable } from '@/rest/auth'
import {EmailCodeInput} from "@clover/public/components/common/input/email-code";
import { useFormSubmit } from '@clover/public/hooks/use.form.submit'
import { sendEmailCode } from '@clover/public/rest/common'
import {accountInfoState} from "@clover/public/state/account";
import { t } from '@clover/public/utils/locale.client'
import {CODE} from "@clover/public/utils/regular";
import { Button, Dialog, Form, FormItem } from '@easykit/design'
import { useAtomValue } from 'jotai/index'
import { type FC, useState } from 'react'
import { useTranslation } from "react-i18next";
import { object, string } from 'zod'

const getSchema = () =>
  object({
    code: string().min(1, t('请输入邮箱验证码')).regex(CODE, t('请输入6位数字验证码')),
  })

export type DisableModalProps = {
  onSuccess?: () => void;
}

export const DisableModal: FC<DisableModalProps> = (props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const title = t("禁用二次验证");
  const account = useAtomValue(accountInfoState);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { ref, submitting, onSubmit } = useFormSubmit<any, { code: string }>({
    action: otpDisable,
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
          <FormItem
            name="code"
            label={t('邮箱验证码（{{email}}）', {
              email: account.email,
            })}
          >
            <EmailCodeInput placeholder={t('请输入邮箱验证码')} api={sendEmailCode} data={{ action: 'otp-disable' }} />
          </FormItem>
          <Button loading={submitting} type="submit" long>
            {t('禁用')}
          </Button>
        </Form>
      </Dialog>
    </p>
  )
}
