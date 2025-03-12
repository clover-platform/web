'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {tt} from "@clover/public/locale";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {ProjectForm} from "@/components/pages/project/form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
  Card,
} from "@easykit/design";
import {MainLayoutProps} from "@/components/layout/main";
import Link from "next/link";
import {DASHBOARD_URL} from "@/config/route";
import {MainPage} from "@clover/public/components/common/page";

export const NewProjectPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "project",
  })
  const title = tt("新建项目");

  return <MainPage>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href={DASHBOARD_URL}>{tt("控制台")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href={"/project"}>{tt("项目")}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <TitleBar title={title}/>
    <Card className={"shadow-none"}>
      <ProjectForm />
    </Card>
  </MainPage>
}
