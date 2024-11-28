'use client';

import {t} from "@easykit/common/utils/locale";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ProfileLayoutProps} from "@/components/layout/profile";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {TokenDisplay} from "@/components/pages/profile/access/tokens/create/token-display";
import {AccessTokenForm} from "@/components/pages/profile/access/tokens/create/form";
import {Button, Space} from "@easykit/design";
import {useCallback, useState} from "react";
import {create, CreateData} from "@/rest/profile/access/token";
import {FormResult} from "@clover/public/hooks/use.form.result";
import BackButton from "@easykit/common/components/button/back";
import {useRouter} from "next/navigation";

export const AccessTokensCreatePage = () => {
    const title = t("创建访问令牌");
    useLayoutConfig<ProfileLayoutProps>({
        active: "access.tokens",
        path: [
            {
                title: t("访问令牌"),
                type: "link",
                href: "/profile/-/access/tokens",
            },
            {
                title,
                type: "item",
            },
        ],
    });

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string>();
    const router = useRouter();

    const onSubmit = useCallback(async (data: CreateData, result: FormResult<string>) => {
        setLoading(true);
        result(await create(data));
        setLoading(false);
    }, [setLoading])

    const onSuccess = useCallback((token?: string) => {
        setToken(token);
    }, [])

    return <>
        <TitleBar title={title} />
        {
            token ? <div className={"space-y-2"}>
                <TokenDisplay token={token} />
                <Space>
                    <Button onClick={() => router.push("/profile/-/access/tokens")}>{t("确定")}</Button>
                </Space>
            </div> : <AccessTokenForm onSuccess={onSuccess} onSubmit={onSubmit}>
                <Space>
                    <Button loading={loading} type={"submit"}>{t("提交")}</Button>
                    <BackButton />
                </Space>
            </AccessTokenForm>
        }
    </>
}
