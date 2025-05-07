'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {tt} from "@clover/public/utils/i18next";
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

export const NewProjectPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "project",
  })
  const title = tt("新建项目");

  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={"/project"}>{tt("项目")}</Link>
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
