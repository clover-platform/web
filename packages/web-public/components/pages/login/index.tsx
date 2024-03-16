'use client';

import {Button, Form, FormItem, Input, useMessage} from "@atom-ui/core";
import {SCHEMA} from "@clover/public/config/pages/login/form";
import React, {useState} from "react";
import {encrypt} from "@clover/public/utils/crypto";
import {login} from "@clover/public/rest/auth";
import {setToken} from "@clover/public/utils/token";
import {useRouter, useSearchParams} from "next/navigation";

export const PublicLoginPage = () => {
    const router = useRouter();
    const msg = useMessage();
    const params = useSearchParams();
    const from = params.get("from");
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        data.password = encrypt(data.password);
        const { message, success, data: result } = await login(data);
        setSubmitting(false);
        if(success) {
            setToken(result);
            router.push(from || "/{#LANG#}/");
        }else{
            msg.error(message);
        }
    }

    return <div className={"w-[360px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#登录#}"}</div>
        </div>
        <div className={"mt-[30px]"}>
            <Form
                schema={SCHEMA}
                onSubmit={onSubmit}
            >
                <FormItem name="account" label="{#邮箱或用户名#}">
                    <Input placeholder={"{#请输入邮箱或用户名#}"}/>
                </FormItem>
                <FormItem name="password" label="{#密码#}">
                    <Input placeholder="{#请输入密码#}" type={"password"}/>
                </FormItem>
                <Button loading={submitting} long type={"submit"}>{"{#立即登录#}"}</Button>
            </Form>
        </div>
    </div>
}
