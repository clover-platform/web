"use client";

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "../../layout/dashboard";

export const DashboardPage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "dashboard",
  })

  return <div>
    DashboardPage
  </div>
}
