"use client";

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {MainPage} from "@clover/public/components/common/page";
import {Assistant} from "@/components/pages/dashboard/assistant";
import {Activity} from "@/components/pages/dashboard/activity";
import {Collect} from "@/components/pages/dashboard/collect";

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "dashboard",
  })

  return <MainPage>
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
