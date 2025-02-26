import {t, tt} from "@clover/public/locale";
import {
  Button,
  Card, Form, FormItem, Input, Separator, Space
} from "@easykit/design";
import {useCallback, useRef, useState} from "react";
import {UseFormReturn} from "react-hook-form";
import {FormResult, useFormResult} from "@clover/public/hooks";
import * as z from "zod";
import {PASSWORD} from "@clover/public/utils/regular";
import {change, PasswordData} from "@/rest/profile/security/password";
import {encrypt} from "@clover/public/utils/crypto";

export const SCHEMA = () => z.object({
  originPassword: z.string()
    .min(1, t("请输入密码"))
    .regex(PASSWORD, t("密码格式不正确")),
  password: z.string()
    .min(1, t("请输入密码"))
    .regex(PASSWORD, t("密码格式不正确")),
  passwordConfirm: z.string()
    .min(1, t("请输入密码"))
    .regex(PASSWORD, t("密码格式不正确"))
}).superRefine(({password, passwordConfirm}, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      code: 'custom',
      path: ['passwordConfirm'],
      message: t("两次密码输入不一致")
    })
  }
});


export const Password = () => {
  const ref = useRef<UseFormReturn>(null);
  const formResult = useFormResult<string>({
    ref,
    onSuccess: () => {
      console.log("success");
    }
  });
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<string>("normal");

  const onSubmit = useCallback(async (data: PasswordData, result: FormResult<string>) => {
    setLoading(true);
    data.originPassword = encrypt(data.originPassword);
    data.password = encrypt(data.password);
    data.passwordConfirm = undefined;
    result(await change(data));
    setLoading(false);
  }, [])

  const cancel = useCallback(() => {
    setState("normal");
    setLoading(false);
  }, [])

  return <Card title={tt("更改密码")}>
    <div className={"space-y-4"}>
      <p>{tt("当您更改密码后，我们会使您在此设备上保持已登录状态，但可能会将您从其他设备注销。")}</p>
      <Separator />
      {
        state === "normal" ? <p>
          <a onClick={() => setState("change")} className={"cursor-pointer"}>{tt("修改密码")}</a>
        </p>: null
      }
      {
        state === "change" ? <Form
          ref={ref}
          schema={SCHEMA()}
          onSubmit={(data) => onSubmit?.(data as PasswordData, formResult)}
        >
          <FormItem name="originPassword" label={t("原密码")}>
            <Input type={"password"} placeholder={t("请输入")} className={"!w-input-md"}/>
          </FormItem>
          <FormItem name="password" label={t("新密码")}>
            <Input type={"password"} placeholder={t("请输入")} className={"!w-input-md"}/>
          </FormItem>
          <FormItem name="passwordConfirm" label={t("确认新密码")}>
            <Input type={"password"} placeholder={t("请输入")} className={"!w-input-md"}/>
          </FormItem>
          <Space>
            <Button loading={loading} type={"submit"}>{t("提交")}</Button>
            <Button variant={"outline"} onClick={cancel}>{tt("取消")}</Button>
          </Space>
        </Form>: null
      }
    </div>
  </Card>
}
