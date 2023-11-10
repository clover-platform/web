'use client';

import { Button, Divider, Form, Input } from "@arco-design/web-react";
import Quick from "@/components/pages/login/quick";
import LoginLink from "@/components/common/login/link";

const LoginPage = () => {
    const passwordLabel = <div className={"flex justify-center items-center"}>
        <div className={"flex-1"}>{"{#密码#}"}</div>
        <div className={"ml-[10px]"}>
            <LoginLink href={"/{#LANG#}/reset-password/"}>{"{#找回密码#}"}</LoginLink>
        </div>
    </div>
    return <div className={"w-[360px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#登录#}"}</div>
            <div className={"ml-[10px]"}>
                <span>{"{#没有账号？#}"}</span>
                <LoginLink href={"/{#LANG#}/register/"}>{"{#注册#}"}</LoginLink>
            </div>
        </div>
        <div className={"mt-[30px]"}>
            <Form size={"large"} layout={"vertical"} autoComplete='off'>
                <Form.Item label={"{#邮箱或用户名#}"}>
                    <Input placeholder={"{#请输入邮箱或用户名#}"} />
                </Form.Item>
                <Form.Item label={passwordLabel}>
                    <Input.Password placeholder={"{#请输入密码#}"} />
                </Form.Item>
                <Form.Item>
                    <Button long type={"primary"}>{"{#立即登录#}"}</Button>
                </Form.Item>
            </Form>
        </div>
        <Divider orientation={"center"}>{"{#第三方快捷登录#}"}</Divider>
        <Quick />
    </div>
};

export default LoginPage;
