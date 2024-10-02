'use client';

import { Button, Divider, Input, Form, FormItem } from "@atom-ui/core";
import Quick from "@/components/pages/login/quick";
import LoginLink from "@/components/common/login/link";
import {SCHEMA} from "@clover/public/config/pages/login/form";
import {useLoginSubmit} from "@clover/public/components/pages/login/hooks";

const LoginPage = () => {
    const { loading, submit } = useLoginSubmit();

    const passwordLabel = <div className={"flex justify-center items-center"}>
        <div className={"flex-1"}>{"{#密码#}"}</div>
        <div className={"ml-[10px]"}>
            <LoginLink href={"/{#LANG#}/reset-password/"} tabIndex={-1}>{"{#找回密码#}"}</LoginLink>
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
            <Form
                schema={SCHEMA}
                onSubmit={submit}
            >
                <FormItem name="username" label="{#邮箱或用户名#}">
                    <Input placeholder={"{#请输入邮箱或用户名#}"} />
                </FormItem>
                <FormItem name="password" label={passwordLabel}>
                    <Input placeholder="{#请输入密码#}" type={"password"} />
                </FormItem>
                <Button loading={loading} long type={"submit"}>{"{#立即登录#}"}</Button>
            </Form>
        </div>
        <Divider orientation={"center"}>{"{#第三方快捷登录#}"}</Divider>
        <Quick />
    </div>
};

export default LoginPage;