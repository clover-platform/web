'use client';

import {Button, Divider, Form, Input, Link as ArcoLink} from "@arco-design/web-react";
import Quick from "@/components/pages/login/quick";
import Link from "next/link";

const LoginPage = () => {
    return <div className={"w-[400px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#登录#}"}</div>
            <div>
                <span>{"{#没有账号？#}"}</span>
                <Link href={"/{#LANG#}/register/"}>
                    <ArcoLink>{"{#注册#}"}</ArcoLink>
                </Link>
            </div>
        </div>
        <div className={"mt-[30px]"}>
            <Form size={"large"} layout={"vertical"} autoComplete='off'>
                <Form.Item label={"{#邮箱或用户名#}"}>
                    <Input placeholder={"{#请输入邮箱或用户名#}"} />
                </Form.Item>
                <Form.Item label={"{#密码#}"}>
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
