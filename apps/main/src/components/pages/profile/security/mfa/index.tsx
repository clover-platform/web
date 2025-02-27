'use client';

import {tt} from "@clover/public/locale";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {ProfileBreadcrumbBase} from "@/components/pages/profile/breadcrumb-base";
import {BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, Card, Separator} from "@easykit/design";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {Page} from "@clover/public/components/common/page";
import Link from "next/link";

export const MFAPage = () => {
  const title = tt("二次验证");
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })

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
    <TitleBar title={title} />
    <Card>
      <div className={"space-y-4"}>
        <div>
          <p>{tt("您已通过增加第二个登录步骤确保您的帐户更加安全，起始时间：")}</p>
          <p className={"font-bold"}>{tt("2022年6月5日 下午9:34")}</p>
          <p className={"mt-sm"}>{tt("如果您使用 Google、Microsoft 或 SAML 单一登录进行登录，则不会采用双重验证。我们建议您使用 Google 或身份提供程序的双重验证。")}</p>
        </div>
        <Separator />
        <p><a className={"cursor-pointer"}>{tt("启用二次验证")}</a></p>
      </div>
    </Card>
  </Page>
}
