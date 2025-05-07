'use client';

import {Form, Button, Input, useMessage, FormItem} from "@easykit/design";
import {useState} from "react";
import {EmailCodeInput} from "@clover/public/components/common/input/email-code";
import {register, sendEmailCode} from "@/rest/auth";
import {setToken} from "@clover/public/utils/token";
import {encrypt} from "@clover/public/utils/crypto";
import LoginLink from "@/components/common/login/link";
import {getFormSchema} from "@/config/pages/register/form";
import {useSearchParams} from "next/navigation";
import { useTranslation } from "react-i18next";
const RegisterPage = () => {
  const msg = useMessage();
  const params = useSearchParams();
  const redirect = params.get("redirect");
  const [formData, setFormData] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    data.password2 = undefined;
    delete data.password2;
    data.password = encrypt(data.password);
    const {success, message, data: result} = await register(data);
    setSubmitting(false);
    if (success) {
      setToken(result);
      location.href = redirect || `/`;
    } else {
      msg.error(message);
    }
  }

  return <div className={"w-[360px]"}>
    <div className={"flex justify-center items-center"}>
      <div className={"text-xl font-bold flex-1"}>{t("注册")}</div>
      <div className={"ml-[10px] space-x-1"}>
        <span>{t("已有账号？")}</span>
        <LoginLink href={`/login`}>{t("登录")}</LoginLink>
      </div>
    </div>
    <div className={"mt-[30px]"}>
      <Form
        onValuesChange={setFormData}
        onSubmit={onSubmit}
        schema={getFormSchema()}
      >
        <FormItem name={"username"} label={t("用户名")}>
          <Input placeholder={t("请输入用户名，字母数字或下划线，字母开头")}/>
        </FormItem>
        <FormItem name={"email"} label={t("邮箱")}>
          <Input placeholder={t("请输入正确的邮箱")}/>
        </FormItem>
        <FormItem name={"code"} label={t("邮箱验证码")}>
          <EmailCodeInput
            needEmail={true}
            placeholder={t("请输入邮箱验证码")} api={sendEmailCode}
            data={{email: formData.email}}
          />
        </FormItem>
        <FormItem name="password" label={t("密码")}>
          <Input type={"password"} placeholder={t("请输入密码")}/>
        </FormItem>
        <FormItem name="password2" label={t("确认密码")}>
          <Input type={"password"} placeholder={t("请再次输入密码")}/>
        </FormItem>
        <Button loading={submitting} type={"submit"} long>{t("注册")}</Button>
      </Form>
    </div>
  </div>
};

export default RegisterPage;
