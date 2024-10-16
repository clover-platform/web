'use client';

import {Button, Form, FormItem, Input} from "@easykit/design";
import {SCHEMA} from "@clover/public/config/pages/login/form";
import {useLoginSubmit} from "@clover/public/components/pages/login/hooks";

export const PublicLoginPage = () => {
    const { loading, submit } = useLoginSubmit();

    return <div className={"w-[360px]"}>
        <div className={"flex justify-center items-center"}>
            <div className={"text-[24px] font-bold flex-1"}>{"{#登录#}"}</div>
        </div>
        <div className={"mt-[30px]"}>
            <Form
                schema={SCHEMA}
                onSubmit={submit}
            >
                <FormItem name="username" label="{#邮箱或用户名#}">
                    <Input placeholder={"{#请输入邮箱或用户名#}"}/>
                </FormItem>
                <FormItem name="password" label="{#密码#}">
                    <Input placeholder="{#请输入密码#}" type={"password"}/>
                </FormItem>
                <Button loading={loading} long type={"submit"}>{"{#立即登录#}"}</Button>
            </Form>
        </div>
    </div>
}
