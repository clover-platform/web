'use client';

import {t} from "@clover/public/locale";
import {Button, Form, FormItem} from "@easykit/design";
import {getFormSchema} from "@/config/pages/otp-bind/form";
import {EmailCodeInput} from "@clover/public/components/common/input/email-code";
import {sendEmailCode} from "@/rest/auth";
import {CodeInput} from "@clover/public/components/common/input/code";
import SecretItem from "@/components/pages/otp-bind/secret";
import {useState} from "react";
import {useAtomValue} from "jotai";
import {accountInfoState} from "@clover/public/state/account";

export const OTPBindPage = () => {
    const [secret, setSecret] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const account = useAtomValue(accountInfoState);

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        // data.password2 = undefined;
        // delete data.password2;
        // data.password = encrypt(data.password);
        // const { success, message, data: result } = await register(data);
        // setSubmitting(false);
        // if(success) {
        //     setToken(result);
        //     location.href = from || `/`;
        // }else{
        //     msg.error(message);
        // }
    }

    return <div className={"w-[360px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-xl font-bold flex-1"}>{t("绑定OTP")}</div>
        </div>
        <div className={"mt-[30px]"}>
            <Form
                defaultValues={{
                    email: account.email
                }}
                onSubmit={onSubmit}
                schema={getFormSchema()}
            >
                <FormItem name={"code"} label={t("邮箱验证码（{{email}}）", {
                    email: account.email
                })}>
                    <EmailCodeInput placeholder={t("请输入邮箱验证码")} api={sendEmailCode} email={account.email} />
                </FormItem>
                <SecretItem username={account.email} onLoad={setSecret} />
                <FormItem name="otpCode" label={t("验证码")}>
                    <CodeInput placeholder={t("请输入身份验证 App 验证码")} />
                </FormItem>
                <Button loading={submitting} type={"submit"} long>{t("注册")}</Button>
            </Form>
        </div>
    </div>
}
