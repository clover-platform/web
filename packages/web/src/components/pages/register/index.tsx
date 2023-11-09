'use client';

import {Button, Form, Input, Link as ArcoLink, Message, Steps} from "@arco-design/web-react";
import Link from "next/link";
import { useState } from "react";
import SecretItem from "@/components/pages/register/secret";
import EmailCodeInput from "@clover/common/components/input/email-code";
import { emailCheck, passwordSet, sendEmailCode } from "@/rest/auth";
import * as v from '@clover/common/validators';
import { setToken } from "@/utils/token";
import { samePassword, setPassword } from "@clover/common/validators";
import { encrypt } from "@/utils/crypto";
import { useRouter, useSearchParams } from "next/navigation";
import LoginLink from "@/components/common/login/link";

const RegisterPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");
    const [step, setStep] = useState(1);
    const [formData1, setFormData1] = useState({} as any);
    const [formData2, setFormData2] = useState({} as any);
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
            setStep(2);
        }else{
            Message.error(message);
        }
    }

    const onPrev = () => {
        setStep(1);
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
            Message.error(message);
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
                <Steps.Step title='{#邮箱验证#}' />
                <Steps.Step title='{#安全设置#}' />
            </Steps>
            <Form
                onValuesChange={(v, values) =>  setFormData1(values)}
                onSubmit={onStep1Submit}
                size={"large"}
                layout={"vertical"}
                autoComplete='off'
                style={{ display: step === 1 ? 'block' : 'none' }}
            >
                <Form.Item label={"{#用户名#}"} field="username" rules={[
                    {required: true, message: '{#请输入用户名#}'},
                    {validator: v.username},
                ]}>
                    <Input placeholder={"{#请输入用户名，字母数字或下划线，字母开头#}"} />
                </Form.Item>
                <Form.Item label={"{#邮箱#}"} field="email" rules={[
                    {required: true, message: '{#请输入正确的邮箱#}'},
                    {validator: v.email},
                ]}>
                    <Input placeholder={"{#请输入正确的邮箱#}"} />
                </Form.Item>
                <Form.Item label={"{#邮箱验证码#}"} field="code" rules={[
                    {required: true, message: '{#请输入正确的邮箱#}'},
                    {length: 6, message: "{#邮箱验证码长度为 6#}"},
                ]}>
                    <EmailCodeInput placeholder={"{#请输入邮箱验证码#}"} api={sendEmailCode} email={formData1.email} />
                </Form.Item>
                <Form.Item>
                    <Button loading={step1Submitting} htmlType={"submit"} long type={"primary"}>{"{#下一步#}"}</Button>
                </Form.Item>
            </Form>
            <Form
                style={{ display: step === 2 ? 'block' : 'none' }}
                size={"large"} layout={"vertical"} autoComplete='off'
                key={formKey}
                onValuesChange={(v, values) =>  setFormData2(values)}
                onSubmit={onStep2Submit}
            >
                <Form.Item label={"{#密码#}"} field="password" rules={[
                    { required: true, message: "{#请输入密码#}" },
                    { validator: setPassword }
                ]}>
                    <Input.Password placeholder={"{#请输入密码#}"} />
                </Form.Item>
                <Form.Item label={"{#确认密码#}"} field="password2" rules={[
                    {required: true, message: "{#请输入密码#}"},
                    { validator: setPassword },
                    {validator: (value, callback) => samePassword(value, callback, formData2.password)}
                ]}>
                    <Input.Password placeholder={"{#请再次输入密码#}"} />
                </Form.Item>
                { step === 2 ? <SecretItem /> : null }
                <Form.Item label={"{#验证码#}"} field="otpCode" rules={[
                    {required: true, message: "{#请输入密码#}"},
                    {length: 6, message: "{#验证码长度为 6#}"}
                ]}>
                    <Input type={"number"} maxLength={6} placeholder={"{#请输入身份验证 App 验证码#}"} />
                </Form.Item>
                <Form.Item>
                    <div className={"flex mx-[-10px]"}>
                        <Button disabled={step2Submitting} onClick={onPrev} className={"mx-[10px]"} long>{"{#上一步#}"}</Button>
                        <Button loading={step2Submitting} className={"mx-[10px]"} long type={"primary"} htmlType={"submit"}>{"{#提交注册#}"}</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    </div>
};

export default RegisterPage;
