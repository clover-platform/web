'use client';

import { Input } from "@clover/core/components/ui/input";
import Button from "@clover/core/components/extend/button";
import Divider from "@clover/core/components/extend/divider";
import Quick from "@/components/pages/login/quick";
import LoginLink from "@/components/common/login/link";
import React, {useState} from "react";
import {login} from "@/rest/auth";
import {setToken} from "@/utils/token";
import {useRouter, useSearchParams} from "next/navigation";
import {encrypt} from "@/utils/crypto";
import Form from "@clover/core/components/extend/form";
import { SCHEMA } from "@/config/pages/login/form";
import useMessage from "@clover/core/components/extend/message";

const LoginPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const from = params.get("from");
    const [submitting, setSubmitting] = useState(false);
    const Message = useMessage();

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        data.password = encrypt(data.password);
        const { message, success, data: result } = await login(data);
        setSubmitting(false);
        if(success) {
            setToken(result);
            router.push(from || "/{#LANG#}/");
        }else{
            Message.error(message);
        }
    }

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
            <Form
                fields={[
                    {
                        name: "account",
                        label: "{#邮箱或用户名#}",
                        placeholder: "{#请输入邮箱或用户名#}",
                        render: (field) => <Input {...field} />
                    },
                    {
                        name: "password",
                        label: passwordLabel,
                        placeholder: "{#请输入密码#}",
                        render: (field) => <Input {...field} type={"password"} />
                    }
                ]}
                schema={SCHEMA}
                onSubmit={onSubmit}
            >
                <Button loading={submitting} long htmlType={"submit"}>{"{#立即登录#}"}</Button>
            </Form>
        </div>
        <Divider orientation={"center"}>{"{#第三方快捷登录#}"}</Divider>
        <Quick />
    </div>
};

export default LoginPage;
