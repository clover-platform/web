'use client';

import {tt} from "@clover/public/locale";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {ProfileBreadcrumbBase} from "@/components/pages/profile/breadcrumb-base";
import {
  Badge,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
  Separator, Skeleton, time
} from "@easykit/design";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {Page} from "@clover/public/components/common/page";
import Link from "next/link";
import {useFetch} from "@clover/public/hooks";
import {OTPStatus, otpStatus} from "@/rest/auth";
import {useCallback, useEffect} from "react";
import {DisableModal} from "@/components/pages/profile/security/mfa/disable-modal";
import {EnableModal} from "@/components/pages/profile/security/mfa/enable-modal";

export const MFAPage = () => {
  const title = tt("二次验证");
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })
  const { loading, load, result } = useFetch<OTPStatus>(otpStatus, {initLoading: true});
  useEffect(() => {
    load().then();
  }, [load])

  const onSuccess = useCallback(() => {
    load().then();
  }, [load])

  const statusTitle = <div className={"flex justify-start items-center space-x-sm"}>
    <span>{ title }</span>
    {
      loading ?
        <Skeleton className={"w-16 h-6"} /> :
        <Badge variant={result?.enable ? "default" : "outline"}>
          { result?.enable ? tt("已启用") : tt("未启用") }
        </Badge>
    }
  </div>

  return <Page>
    <ProfileBreadcrumbBase>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href="/profile/security">{tt("安全设置")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </ProfileBreadcrumbBase>
    <TitleBar title={statusTitle} />
    <Card>
      <div className={"space-y-4"}>
        <div>
          {
            result?.enable ? <>
              <p>{tt("您已通过增加第二个登录步骤确保您的帐户更加安全，起始时间：")}</p>
              <p className={"font-bold mb-sm"}>{time(result?.enableTime)}</p>
            </> : null
          }
          <p>{tt("如果您使用 Google、Microsoft 或 SAML 单一登录进行登录，则不会采用双重验证。我们建议您使用 Google 或身份提供程序的双重验证。")}</p>
        </div>
        <Separator />
        {
          loading ? <Skeleton className={"w-28 h-6"} /> : (
            result?.enable ? <DisableModal onSuccess={onSuccess} /> : <EnableModal onSuccess={onSuccess} />
          )
        }
      </div>
    </Card>
  </Page>
}
