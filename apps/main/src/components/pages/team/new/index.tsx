'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
} from "@easykit/design";
import {MainLayoutProps} from "@/components/layout/main";
import Link from "next/link";
import {MainPage} from "@clover/public/components/common/page";
import {TeamForm} from "@/components/pages/team/form";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";
import { useTranslation } from "react-i18next";

export const NewTeamPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "team",
  })
  const { t } = useTranslation();
  const title = t("新建团队");

  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={"/team"}>{t("团队")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
    <TitleBar title={title}/>
    <Card>
      <TeamForm />
    </Card>
  </MainPage>
}
