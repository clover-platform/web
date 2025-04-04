'use client';

import {MainPage} from "@clover/public/components/common/page";
import {
  BreadcrumbItem,
  BreadcrumbPage,
} from "@easykit/design";
import {tt} from "@clover/public/locale";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";

export const ProfilePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })
  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>{tt("个人资料")}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
  </MainPage>
}
