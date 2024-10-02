'use client';

import { Form, Steps, StepsItem, Button, Input, useMessage, FormItem } from "@atom-ui/core";
import { useState } from "react";
import SecretItem from "@/components/pages/register/secret";
import EmailCodeInput from "@easy-kit/common/components/input/email-code";
import { emailCheck, passwordSet, sendEmailCode } from "@/rest/auth";
import { setToken } from "@clover/public/utils/token";
import { encrypt } from "@clover/public/utils/crypto";
import { useRouter, useSearchParams } from "next/navigation";
import LoginLink from "@/components/common/login/link";
import { FORM_STEP1_SCHEMA, FORM_STEP2_SCHEMA } from "@/config/pages/register/form";
import CodeInput from "@easy-kit/common/components/input/code";

const RegisterPage = () => {
    const msg = useMessage();
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");
    const [step, setStep] = useState(0);
    const [formData1, setFormData1] = useState<any>({});
    const [step1Submitting, setStep1Submitting] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    const [step2Submitting, setStep2Submitting] = useState(false);

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

    const onStep2Submit = async (data: any) => {
        data.password2 = undefined;
        delete data.password2;
        data.password = encrypt(data.password);
        setStep2Submitting(true);
        const { success, message, data: result } = await passwordSet(data);
        setStep2Submitting(false);
        if(success) {
            setToken(result);
            router.push(from || "/{#LANG#}/");
        }else{
            msg.error(message);
        }
    }

    return <div className={"w-[400px] m-[20px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#注册#}"}</div>
            <div className={"ml-[10px]"}>
                <span>{"{#已有账号？#}"}</span>
                <LoginLink href={"/{#LANG#}/login/"}>{"{#登录#}"}</LoginLink>
            </div>
        </div>
        <div className={"mt-[30px]"}>
            <Steps current={step} className={"mb-[30px]"}>
                <StepsItem title='{#邮箱验证#}' />
                <StepsItem title='{#安全设置#}' />
            </Steps>
            <Form
                onValuesChange={setFormData1}
                onSubmit={onStep1Submit}
                schema={FORM_STEP1_SCHEMA}
                style={{ display: step === 0 ? 'block' : 'none' }}
            >
                <FormItem name={"username"} label={"{#用户名#}"}>
                    <Input placeholder={"{#请输入用户名，字母数字或下划线，字母开头#}"} />
                </FormItem>
                <FormItem name={"email"} label={"{#邮箱#}"}>
                    <Input placeholder={"{#请输入正确的邮箱#}"} />
                </FormItem>
                <FormItem name={"code"} label={"{#邮箱验证码#}"}>
                    <EmailCodeInput placeholder={"{#请输入邮箱验证码#}"} api={sendEmailCode} email={formData1.email} />
                </FormItem>
                <Button loading={step1Submitting} type={"submit"} long>{"{#下一步#}"}</Button>
            </Form>
            <Form
                key={formKey}
                onSubmit={onStep2Submit}
                schema={FORM_STEP2_SCHEMA}
                style={{ display: step === 1 ? 'block' : 'none' }}
            >
                <FormItem name="password" label={"{#密码#}"}>
                    <Input type={"password"} placeholder={"{#请输入密码#}"} />
                </FormItem>
                <FormItem name="password2" label={"{#确认密码#}"}>
                    <Input type={"password"} placeholder={"{#请再次输入密码#}"} />
                </FormItem>
                { step === 1 ? <SecretItem /> : null }
                <FormItem name="code" label={"{#验证码#}"}>
                    <CodeInput placeholder={"{#请输入身份验证 App 验证码#}"} />
                </FormItem>
                <div className={"flex mx-[-10px]"}>
                    <Button disabled={step2Submitting} onClick={onPrev} className={"mx-[10px]"} long variant={"outline"}>{"{#上一步#}"}</Button>
                    <Button loading={step2Submitting} className={"mx-[10px]"} long type={"submit"}>{"{#提交注册#}"}</Button>
                </div>
            </Form>
        </div>
    </div>
};

export default RegisterPage;
