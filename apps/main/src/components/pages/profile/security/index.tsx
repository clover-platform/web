'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {tt} from "@clover/public/locale";
import {
  BreadcrumbItem,
  BreadcrumbPage,
  Card
} from "@easykit/design";
import Link from "next/link";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {Page} from "@clover/public/components/common/page";
import {ProfileBreadcrumbBase} from "@/components/pages/profile/breadcrumb-base";

export const SecurityPage = () => {
  const title = tt("安全设置");
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })

  return <Page>
    <ProfileBreadcrumbBase>
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </ProfileBreadcrumbBase>
    <TitleBar title={title} />
    <Card title={tt("更改密码")}>
      <p>{tt("当您更改密码后，我们会使您在此设备上保持已登录状态，但可能会将您从其他设备注销。")}</p>
    </Card>
    <Card title={tt("二次验证")}>
      <div className={"space-y-2"}>
        <p>{tt("通过第二个登录步骤确保您的帐户更加安全。")}</p>
        <p>
          <Link href={"/profile/security/2fa"}>{tt("管理二次验证")}</Link>
        </p>
      </div>
    </Card>
    <Card title={tt("访问令牌")}>
      <div className={"space-y-2"}>
        <p>{tt("脚本或其他进程可以使用访问令牌通过命令行应用或IDE执行基本身份验证。如果进行身份验证的帐户已启用双重验证，则必须使用访问令牌。您应该像保护其他密码一样确保访问令牌的安全。")}</p>
        <p>
          <Link href={"/profile/security/access/tokens"}>{tt("管理访问令牌")}</Link>
        </p>
      </div>
    </Card>
  </Page>
}
