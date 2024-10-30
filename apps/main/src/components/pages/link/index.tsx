'use client';

import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {Button, Form, Input, Result, Space, Spin, Image, useMessage, FormItem} from "@easykit/design";
import {linkCode, loginAndLink} from "@/rest/auth";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {encrypt} from "@clover/public/utils/crypto";
import {setToken} from "@clover/public/utils/token";
import {SUPPORT_WAY} from "@/config/pages/login/quick";
import {SCHEMA} from "@/config/pages/link/form";
import { t } from '@easykit/common/utils/locale';

export interface LinkPageProps extends PropsWithChildren {
    type: string
}

const LinkPage = (props: LinkPageProps) => {
    const {
        type
    } = props;

    const msg = useMessage();
    const router = useRouter();
    const params = useSearchParams();
    const code = params.get('code') as string;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null as any);
    const [submitting, setSubmitting] = useState(false);

    const load = async () => {
        setLoading(true);
        const { success, data } = await linkCode({
            code, type
        })
        setError(!success);
        if(success) {
            if(data?.isBind) {
                setToken(data);
                router.push(`/`);
            }else{
                setUser(data);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        load().then();
    }, []);

    const onSubmit = useCallback(async (data: any) => {
        setSubmitting(true);
        data.password = encrypt(data.password);
        const { success, message, data: result } = await loginAndLink({
            ...data,
            token: user.token
        })
        setSubmitting(false);
        if(success) {
            setToken(result);
            router.push(`/`);
        }else{
            msg.error(message);
        }
    }, [user])

    const buttons = <Space>
        <Button onClick={() => load()} variant={"secondary"}>{t("重试")}</Button>
        <Link href={`/login`}>
            <Button>{t("返回登录")}</Button>
        </Link>
    </Space>

    const icon = SUPPORT_WAY.find((item) => item.id === type)?.icon;

    return loading ? <Spin /> : <>
        {
            error ? <Result
                status='error'
                subTitle={t("第三方平台接口错误或链接已超时")}
                extra={buttons}
            /> : <div className={"w-[360px]"}>
                <div className={"flex justify-start items-center"}>
                    <div className={"w-[40px] h-[40px] rounded-full bg-[#2E3340] flex items-center justify-center"}>
                        { icon }
                    </div>
                    <div className={"text-[24px] font-bold mx-[10px]"}>
                        {t("账号绑定")}
                    </div>
                    {
                        user ? <>
                            <div className={"rounded-[50%] overflow-hidden"}>
                                <Image
                                    width={28}
                                    height={28}
                                    src={(user as any).avatar}
                                    alt={t("头像")}
                                />
                            </div>
                            <div className={"ml-[5px]"}>
                                { (user as any).username }
                            </div>
                        </> : null
                    }
                </div>
                <div className={"mt-[30px]"}>
                    <Form
                        schema={SCHEMA}
                        onSubmit={onSubmit}
                    >
                        <FormItem name={"account"} label={t("邮箱或用户名")}>
                            <Input placeholder={t("请输入邮箱或用户名")} />
                        </FormItem>
                        <FormItem name={"password1"} label={t("密码")}>
                            <Input type={"password"} placeholder={t("请输入密码")} />
                        </FormItem>
                        <Button loading={submitting} long type={"submit"}>{t("登录并绑定")}</Button>
                    </Form>
                </div>
            </div>
        }
    </>
};

export default LinkPage;
