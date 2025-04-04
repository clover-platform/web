"use client";

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {MainPage} from "@clover/public/components/common/page";
import {Assistant} from "@/components/pages/dashboard/assistant";
import {Activity} from "@/components/pages/dashboard/activity";
import {Collect} from "@/components/pages/dashboard/collect";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";
import {BreadcrumbItem, BreadcrumbPage} from "@easykit/design";
import {tt} from "@clover/public/locale";

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "dashboard",
  })

  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>{tt("概览")}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
    <div className={"flex justify-start items-start space-x-md"}>
      <div className={"flex-1 space-y-md"}>
        <Assistant />
        <Activity />
      </div>
      <div className={"w-96"}>
        <Collect />
      </div>
    </div>
  </MainPage>
}
