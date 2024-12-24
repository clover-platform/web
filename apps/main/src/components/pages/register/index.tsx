'use client';

import { Form, Steps, StepsItem, Button, Input, useMessage, FormItem } from "@easykit/design";
import {useCallback, useState} from "react";
import SecretItem from "@/components/pages/register/secret";
import { EmailCodeInput } from "@clover/public/components/common/input/email-code";
import {emailCheck, register, sendEmailCode} from "@/rest/auth";
import { setToken } from "@clover/public/utils/token";
import { encrypt } from "@clover/public/utils/crypto";
import { useRouter, useSearchParams } from "next/navigation";
import LoginLink from "@/components/common/login/link";
import {getFormStep1Schema, getFormStep2Schema} from "@/config/pages/register/form";
import { CodeInput } from "@clover/public/components/common/input/code";
import { t } from '@clover/public/locale';

const RegisterPage = () => {
    const msg = useMessage();
    const params = useSearchParams();
    const from = params.get("from");
    const [step, setStep] = useState(0);
    const [formData1, setFormData1] = useState<any>({});
    const [step1Submitting, setStep1Submitting] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    const [step2Submitting, setStep2Submitting] = useState(false);
    const [secret, setSecret] = useState("");

    const onStep1Submit = async (data: any) => {
        setStep1Submitting(true);
        const { success, message, data: result } = await emailCheck(data);
        setStep1Submitting(false);
        if(success) {
            setToken(result);
            setFormKey(Date.now());
            setStep(1);
        }else{
            msg.error(message);
        }
    }

    const onPrev = () => {
        setStep(0);
    }

    const onStep2Submit = useCallback(async (data: any) => {
        data.password2 = undefined;
        delete data.password2;
        data.password = encrypt(data.password);
        data.secret = secret;
        setStep2Submitting(true);
        const { success, message, data: result } = await register({
            ...formData1,
            ...data
        });
        setStep2Submitting(false);
        if(success) {
            setToken(result);
            location.href = from || `/`;
        }else{
            msg.error(message);
        }
    }, [formData1, secret])

    return <div className={"w-[400px] m-[20px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{t("注册")}</div>
            <div className={"ml-[10px] space-x-1"}>
                <span>{t("已有账号？")}</span>
                <LoginLink href={`/login`}>{t("登录")}</LoginLink>
            </div>
        </div>
        <div className={"mt-[30px]"}>
            <Steps current={step} className={"mb-[30px]"}>
                <StepsItem title={t("邮箱验证")} />
                <StepsItem title={t("安全设置")} />
            </Steps>
            <Form
                onValuesChange={setFormData1}
                onSubmit={onStep1Submit}
                schema={getFormStep1Schema()}
                style={{ display: step === 0 ? 'block' : 'none' }}
            >
                <FormItem name={"username"} label={t("用户名")}>
                    <Input placeholder={t("请输入用户名，字母数字或下划线，字母开头")} />
                </FormItem>
                <FormItem name={"email"} label={t("邮箱")}>
                    <Input placeholder={t("请输入正确的邮箱")} />
                </FormItem>
                <FormItem name={"code"} label={t("邮箱验证码")}>
                    <EmailCodeInput placeholder={t("请输入邮箱验证码")} api={sendEmailCode} email={formData1.email} />
                </FormItem>
                <Button loading={step1Submitting} type={"submit"} long>{t("下一步")}</Button>
            </Form>
            <Form
                key={formKey}
                onSubmit={onStep2Submit}
                schema={getFormStep2Schema()}
                style={{ display: step === 1 ? 'block' : 'none' }}
            >
                <FormItem name="password" label={t("密码")}>
                    <Input type={"password"} placeholder={t("请输入密码")} />
                </FormItem>
                <FormItem name="password2" label={t("确认密码")}>
                    <Input type={"password"} placeholder={t("请再次输入密码")} />
                </FormItem>
                { step === 1 ? <SecretItem username={formData1?.username} onLoad={setSecret} /> : null }
                <FormItem name="code" label={t("验证码")}>
                    <CodeInput placeholder={t("请输入身份验证 App 验证码")} />
                </FormItem>
                <div className={"flex mx-[-10px]"}>
                    <Button disabled={step2Submitting} onClick={onPrev} className={"mx-[10px]"} long variant={"outline"}>{t("上一步")}</Button>
                    <Button loading={step2Submitting} className={"mx-[10px]"} long type={"submit"}>{t("提交注册")}</Button>
                </div>
            </Form>
        </div>
    </div>
};

export default RegisterPage;
