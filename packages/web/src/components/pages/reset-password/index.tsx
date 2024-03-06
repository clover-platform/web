'use client';

import { Button, Form, FormItem, FormValues, Input, Steps, StepsItem, useMessage } from "@atom-ui/core";
import { useState } from "react";
import EmailCodeInput from "@easy-kit/common/components/input/email-code";
import {passwordReset, resetEmailCheck, sendResetEmailCode} from "@/rest/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {setToken} from "@/utils/token";
import {encrypt} from "@/utils/crypto";
import { EMAIL_FORM_SCHEMA, PASSWORD_FORM_SCHEMA } from "@/config/pages/reset-password/form";

const ResetPasswordPage = () => {
    const msg = useMessage();
    const params = useSearchParams();
    const from = params.get("from");
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [formData1, setFormData1] = useState<FormValues>({});
    const [step1Submitting, setStep1Submitting] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    const [step2Submitting, setStep2Submitting] = useState(false);

    const onStep1Submit = async (data: any) => {
        setStep1Submitting(true);
        const { success, message, data: result } = await resetEmailCheck(data);
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
        const { success, message, data: result } = await passwordReset(data);
        setStep2Submitting(false);
        if(success) {
            setToken(result);
            router.push(from || "/{#LANG#}/");
        }else{
            msg.error(message);
        }
    }

    return <div className={"w-[360px] m-[20px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#重置密码#}"}</div>
        </div>
        <div className={"mt-[30px]"}>
            <Steps current={step} className={"mb-[30px]"}>
                <StepsItem title='{#邮箱验证#}' />
                <StepsItem title='{#设置密码#}' />
            </Steps>
            <Form
                onValuesChange={setFormData1}
                onSubmit={onStep1Submit}
                schema={EMAIL_FORM_SCHEMA}
                style={{ display: step === 0 ? 'block' : 'none' }}
            >
                <FormItem name={"email"} label={"{#邮箱#}"}>
                    <Input placeholder={"{#请输入正确的邮箱#}"} />
                </FormItem>
                <FormItem name={"code"} label={"{#邮箱验证码#}"}>
                    <EmailCodeInput placeholder={"{#请输入邮箱验证码#}"} api={sendResetEmailCode} email={formData1.email} />
                </FormItem>
                <Button loading={step1Submitting} type={"submit"} long>{"{#下一步#}"}</Button>
            </Form>
            <Form
                style={{ display: step === 1 ? 'block' : 'none' }}
                key={formKey}
                onSubmit={onStep2Submit}
                schema={PASSWORD_FORM_SCHEMA}
            >
                <FormItem name={"password"} label={"{#密码#}"}>
                    <Input type={"password"} placeholder={"{#请输入正确的邮箱#}"} />
                </FormItem>
                <FormItem name={"password2"} label={"{#确认密码#}"}>
                    <Input type={"password"} placeholder={"{#请再次输入密码#}"} />
                </FormItem>
                <div className={"flex mx-[-10px]"}>
                    <Button disabled={step2Submitting} onClick={onPrev} className={"mx-[10px]"} variant={"outline"} long>{"{#上一步#}"}</Button>
                    <Button loading={step2Submitting} className={"mx-[10px]"} long type={"submit"}>{"{#修改密码#}"}</Button>
                </div>
            </Form>
        </div>
    </div>
};

export default ResetPasswordPage;
