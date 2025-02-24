'use client';

import {t} from "@clover/public/locale";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {TokenDisplay} from "@/components/pages/profile/access/tokens/create/token-display";
import {AccessTokenForm} from "@/components/pages/profile/access/tokens/create/form";
import {Button, Card, Space} from "@easykit/design";
import {useCallback, useState} from "react";
import {create, CreateData} from "@/rest/profile/access/token";
import {FormResult} from "@clover/public/hooks/use.form.result";
import BackButton from "@clover/public/components/common/button/back";
import {useRouter} from "next/navigation";
import {MainLayoutProps} from "@/components/layout/main";

export const AccessTokensCreatePage = () => {
  const title = t("创建访问令牌");
  useLayoutConfig<MainLayoutProps>({
    active: "access.tokens",
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
    <TitleBar title={title}/>
    <Card className={"shadow-none"}>
      {
        token ? <div className={"space-y-2"}>
          <TokenDisplay token={token}/>
          <Space>
            <Button onClick={() => router.push("/profile/-/access/tokens")}>{t("确定")}</Button>
          </Space>
        </div> : <AccessTokenForm onSuccess={onSuccess} onSubmit={onSubmit}>
          <Space>
            <Button loading={loading} type={"submit"}>{t("提交")}</Button>
            <BackButton/>
          </Space>
        </AccessTokenForm>
      }
    </Card>
  </>
}
