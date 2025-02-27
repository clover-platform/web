'use client';

import {t, tt} from "@clover/public/locale";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {TokenDisplay} from "@/components/pages/profile/access/tokens/create/token-display";
import {AccessTokenForm} from "@/components/pages/profile/access/tokens/create/form";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  Space
} from "@easykit/design";
import {useCallback, useState} from "react";
import {create, CreateData} from "@/rest/profile/access/token";
import {FormResult} from "@clover/public/hooks/use.form.result";
import BackButton from "@clover/public/components/common/button/back";
import {useRouter} from "next/navigation";
import {MainLayoutProps} from "@/components/layout/main";
import {Page} from "@clover/public/components/common/page";
import Link from "next/link";
import {ProfileBreadcrumbBase} from "@/components/pages/profile/breadcrumb-base";

export const AccessTokensCreatePage = () => {
  const title = t("创建访问令牌");
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })

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

  return <Page>
    <ProfileBreadcrumbBase>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/profile/security">{tt("安全设置")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/profile/security/access/tokens">{tt("访问令牌")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </ProfileBreadcrumbBase>
    <TitleBar title={title}/>
    <Card>
      {
        token ? <div className={"space-y-2"}>
          <TokenDisplay token={token}/>
          <Space>
            <Button onClick={() => router.push("/profile/security/access/tokens")}>{t("确定")}</Button>
          </Space>
        </div> : <AccessTokenForm onSuccess={onSuccess} onSubmit={onSubmit}>
          <Space>
            <Button loading={loading} type={"submit"}>{t("提交")}</Button>
            <BackButton/>
          </Space>
        </AccessTokenForm>
      }
    </Card>
  </Page>
}
