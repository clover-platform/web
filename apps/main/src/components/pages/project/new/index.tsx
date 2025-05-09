'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {ProjectForm} from "@/components/pages/project/form";
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
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";
import { useTranslation } from "react-i18next";

export const NewProjectPage = () => {
  const { t } = useTranslation();
  useLayoutConfig<MainLayoutProps>({
    active: "project",
  })
  const title = t("新建项目");

  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={"/project"}>{t("项目")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
    <TitleBar title={title}/>
    <Card className={"shadow-none"}>
      <ProjectForm />
    </Card>
  </MainPage>
}
