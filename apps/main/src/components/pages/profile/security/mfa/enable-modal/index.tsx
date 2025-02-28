import {tt} from "@clover/public/locale";
import {Button, Dialog, Form, FormItem} from "@easykit/design";
import {FC, useState} from "react";
import {EmailCodeInput} from "@clover/public/components/common/input/email-code";
import SecretItem from "@/components/pages/otp-bind/secret";
import {CodeInput} from "@clover/public/components/common/input/code";
import {useAtomValue} from "jotai";
import {accountInfoState} from "@clover/public/state/account";
import * as z from "zod";
import {CODE} from "@clover/public/utils/regular";
import {sendEmailCode} from "@clover/public/rest/common";
import {otpBind, OTPBindData} from "@/rest/auth";
import {useFormSubmit} from "@clover/public/hooks/use.form.submit";

const getSchema = () => z.object({
  code: z.string()
    .min(1, tt("请输入邮箱验证码"))
    .regex(CODE, tt("请输入6位数字验证码")),
  otpCode: z.string()
    .min(1, tt("请输入身份验证 App 验证码"))
    .regex(CODE, tt("请输入6位数字验证码")),
});

export type EnableModalProps = {
  onSuccess?: () => void;
}

export const EnableModal: FC<EnableModalProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const title = tt("启用二次验证");
  const account = useAtomValue(accountInfoState);
  const {ref, submitting, onSubmit} = useFormSubmit<any,OTPBindData>({
    action: otpBind,
    onSuccess: () => {
      setVisible(false);
      props.onSuccess?.();
    }
  })

  return <p>
    <a
      onClick={() => setVisible(true)}
      className={"cursor-pointer"}
    >
      {title}
    </a>
    <Dialog
      visible={visible}
      title={title}
      maskClosable={false}
      onCancel={() => setVisible(false)}
    >
      <Form
        ref={ref}
        defaultValues={{
          email: account.email
        }}
        onSubmit={onSubmit}
        schema={getSchema()}
      >
        <SecretItem />
        <FormItem name={"code"} label={tt("邮箱验证码（{{email}}）", {
          email: account.email
        })}>
          <EmailCodeInput placeholder={tt("请输入邮箱验证码")} api={sendEmailCode} data={{action: "otp-enable"}}/>
        </FormItem>
        <FormItem name="otpCode" label={tt("验证码")}>
          <CodeInput placeholder={tt("请输入身份验证 App 验证码")}/>
        </FormItem>
        <Button loading={submitting} type={"submit"} long>{tt("启用")}</Button>
      </Form>
    </Dialog>
  </p>
}
