'use client';

import React, {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {Button, Form, Input, Result, Space, Spin, Image, useMessage, FormItem} from "@easykit/design";
import {linkCode, loginAndLink} from "@/rest/auth";
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import {encrypt} from "@clover/public/utils/crypto";
import {setToken} from "@clover/public/utils/token";
import {getSupportWay} from "@/config/pages/login/quick";
import {getSchema} from "@/config/pages/link/form";
import { t } from '@clover/public/locale';

export interface LinkPageProps extends PropsWithChildren {
    type: string
}

const LinkPage = (props: LinkPageProps) => {
    const {
        type
    } = props;

    const msg = useMessage();
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
                location.href = "/";
            }else{
                setLoading(false);
                setUser(data);
            }
        }else{
            setLoading(false);
        }
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
            location.href = "/";
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

    const icon = getSupportWay().find((item) => item.id === type)?.icon;

    return loading ? <Spin /> : <>
        {
            error ? <Result
                status='error'
                subTitle={t("第三方平台接口错误或链接已超时")}
                extra={buttons}
            /> : <div className={"w-[360px]"}>
                <div className={"flex justify-center items-center space-x-2"}>
                    <div className={"w-[28px] h-[28px] rounded-full bg-[#2E3340] flex items-center justify-center"}>
                        { icon }
                    </div>
                    <div>X</div>
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
                        schema={getSchema()}
                        onSubmit={onSubmit}
                    >
                        <FormItem name={"account"} label={t("邮箱或用户名")}>
                            <Input placeholder={t("请输入邮箱或用户名")} />
                        </FormItem>
                        <FormItem name={"password"} label={t("密码")}>
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
