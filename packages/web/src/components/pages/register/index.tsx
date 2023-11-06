'use client';

import { Button, Form, Input, Link as ArcoLink, Steps } from "@arco-design/web-react";
import Link from "next/link";
import { useState } from "react";
import SecretItem from "@/components/pages/register/secret";
import EmailCodeInput from "../../../../../common/components/input/email-code";
import { emailCode } from "@/rest/auth";
import * as v from '@clover/common/validators';

const RegisterPage = () => {
    const [step, setStep] = useState(1);
    const [formData1, setFormData1] = useState({} as any);
    const [formData2, setFormData2] = useState({} as any);

    const onStep1Submit = (data: any) => {
        setStep(2);
    }

    return <div className={"w-[400px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#注册#}"}</div>
            <div className={"ml-[10px]"}>
                <span>{"{#已有账号？#}"}</span>
                <Link href={"/{#LANG#}/login/"}>
                    <ArcoLink>{"{#登录#}"}</ArcoLink>
                </Link>
            </div>
        </div>
        <div className={"mt-[30px]"}>
            <Steps current={step} className={"mb-[30px]"}>
                <Steps.Step title='{#邮箱验证#}' />
                <Steps.Step title='{#安全设置#}' />
            </Steps>
            {
                step === 1 ? <Form
                    onValuesChange={(v, values) =>  setFormData1(values)}
                    onSubmit={onStep1Submit}
                    size={"large"}
                    layout={"vertical"}
                    autoComplete='off'
                >
                    <Form.Item label={"{#用户名#}"} field="account" rules={[
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
                        <EmailCodeInput placeholder={"{#请输入邮箱验证码#}"} api={emailCode} email={formData1.email} />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={"submit"} long type={"primary"}>{"{#下一步#}"}</Button>
                    </Form.Item>
                </Form> : null
            }
            {
                step === 2 ? <Form size={"large"} layout={"vertical"} autoComplete='off'>
                    <Form.Item label={"{#密码#}"}>
                        <Input.Password placeholder={"{#请输入密码#}"} />
                    </Form.Item>
                    <Form.Item label={"{#确认密码#}"}>
                        <Input.Password placeholder={"{#请再次输入密码#}"} />
                    </Form.Item>
                    <SecretItem />
                    <Form.Item label={"{#验证码#}"}>
                        <Input placeholder={"{#请输入身份验证 App 验证码#}"} />
                    </Form.Item>
                    <Form.Item>
                        <div className={"flex mx-[-10px]"}>
                            <Button className={"mx-[10px]"} long>{"{#上一步#}"}</Button>
                            <Button className={"mx-[10px]"} long type={"primary"}>{"{#提交注册#}"}</Button>
                        </div>
                    </Form.Item>
                </Form> : null
            }
        </div>
    </div>
};

export default RegisterPage;
