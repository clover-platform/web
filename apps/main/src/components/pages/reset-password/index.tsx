'use client';

import { Button, Form, FormItem, Input, Steps, StepsItem, useMessage } from "@easykit/design";
import { useState } from "react";
import EmailCodeInput from "@easykit/common/components/input/email-code";
import {passwordReset, resetEmailCheck, sendResetEmailCode} from "@/rest/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {setToken} from "@clover/public/utils/token";
import {encrypt} from "@clover/public/utils/crypto";
import { EMAIL_FORM_SCHEMA, PASSWORD_FORM_SCHEMA } from "@/config/pages/reset-password/form";
import { t } from '@easykit/common/utils/locale';
import {useLocaleCode} from "@easykit/common/hooks";

const ResetPasswordPage = () => {
    const msg = useMessage();
    const params = useSearchParams();
    const from = params.get("from");
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [formData1, setFormData1] = useState<any>({});
    const [step1Submitting, setStep1Submitting] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());
    const [step2Submitting, setStep2Submitting] = useState(false);
    const lc = useLocaleCode();

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
            router.push(from || `/${lc}/`);
        }else{
            msg.error(message);
        }
    }

    return <div className={"w-[360px] m-[20px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{t("重置密码")}</div>
        </div>
        <div className={"mt-[30px]"}>
            <Steps current={step} className={"mb-[30px]"}>
                <StepsItem title={t("邮箱验证")} />
                <StepsItem title={t("设置密码")} />
            </Steps>
            <Form
                onValuesChange={setFormData1}
                onSubmit={onStep1Submit}
                schema={EMAIL_FORM_SCHEMA}
                style={{ display: step === 0 ? 'block' : 'none' }}
            >
                <FormItem name={"email"} label={t("邮箱")}>
                    <Input placeholder={t("请输入正确的邮箱")} />
                </FormItem>
                <FormItem name={"code"} label={t("邮箱验证码")}>
                    <EmailCodeInput placeholder={t("请输入邮箱验证码")} api={sendResetEmailCode} email={formData1.email} />
                </FormItem>
                <Button loading={step1Submitting} type={"submit"} long>{t("下一步")}</Button>
            </Form>
            <Form
                style={{ display: step === 1 ? 'block' : 'none' }}
                key={formKey}
                onSubmit={onStep2Submit}
                schema={PASSWORD_FORM_SCHEMA}
            >
                <FormItem name={"password"} label={t("密码")}>
                    <Input type={"password"} placeholder={t("请输入正确的邮箱")} />
                </FormItem>
                <FormItem name={"password2"} label={t("确认密码")}>
                    <Input type={"password"} placeholder={t("请再次输入密码")} />
                </FormItem>
                <div className={"flex mx-[-10px]"}>
                    <Button disabled={step2Submitting} onClick={onPrev} className={"mx-[10px]"} variant={"outline"} long>{t("上一步")}</Button>
                    <Button loading={step2Submitting} className={"mx-[10px]"} long type={"submit"}>{t("修改密码")}</Button>
                </div>
            </Form>
        </div>
    </div>
};

export default ResetPasswordPage;
