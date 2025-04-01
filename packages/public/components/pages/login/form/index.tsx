import {SCHEMA} from "@clover/public/config/pages/login/form";
import {Button, Dialog, Form, FormItem, Input, useMessage} from "@easykit/design";
import {t, tt} from "@clover/public/locale";
import {FC, ReactNode, useCallback, useState} from "react";
import {useSearchParams} from "next/navigation";
import {encrypt} from "@clover/public/utils/crypto";
import {login} from "@clover/public/rest/auth";
import {setToken, Token} from "@clover/public/utils/token";
import {CodeInput} from "@clover/public/components/common/input/code";
import * as z from "zod";
import {CODE} from "@clover/public/utils/regular";
import cloneDeep from "lodash/cloneDeep";

const getSchema = () => z.object({
  code: z.string()
    .min(1, tt("请输入身份验证 App 验证码"))
    .regex(CODE, tt("请输入6位数字验证码")),
});

export type LoginFormProps = {
  passwordLabel: ReactNode;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { passwordLabel } = props;
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  const [formData, setFormData] = useState<any>();
  const [visible, setVisible] = useState(false);

  const submit = useCallback(async (data: any) => {
    const originData = cloneDeep(data);
    setLoading(true);
    data.password = encrypt(data.password);
    const {message, success, data: result, code} = await login(data);
    setLoading(false);
    if (success) {
      setToken(result as Token);
      location.href = redirect || `/`;
    } else {
      if(code === 10009) { // 需要二次验证
        setFormData(originData);
        setVisible(true);
      }else{
        msg.error(message);
      }
    }
  }, [msg, redirect])

  const onCancel = useCallback(() => {
    setVisible(false);
    setFormData(null)
  }, []);

  const onSubmitOTP = useCallback((data: any) => {
    submit({
      ...data,
      ...formData
    }).then();
  }, [formData, submit])

  return <>
    <Form
      schema={SCHEMA()}
      onSubmit={submit}
    >
      <FormItem name="username" label={t("邮箱或用户名")}>
        <Input placeholder={t("请输入邮箱或用户名")}/>
      </FormItem>
      <FormItem name="password" label={passwordLabel}>
        <Input placeholder={t("请输入密码")} type={"password"}/>
      </FormItem>
      <div>
        <Button className={"mt-sm"} loading={loading} long type={"submit"}>{t("立即登录")}</Button>
      </div>
    </Form>
    <Dialog
      visible={visible}
      onCancel={onCancel}
      title={tt("二次验证")}
      maskClosable={false}
      className={"max-w-[480px]"}
    >
      <Form
        onSubmit={onSubmitOTP}
        schema={getSchema()}
      >
        <FormItem name="code" label={tt("验证码")}>
          <CodeInput placeholder={tt("请输入身份验证 App 验证码")}/>
        </FormItem>
        <Button loading={loading} type={"submit"} long>{tt("确认")}</Button>
      </Form>
    </Dialog>
  </>
}
