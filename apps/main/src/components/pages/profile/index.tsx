'use client';

import {MainPage} from "@clover/public/components/common/page";
import {
  BreadcrumbItem,
  BreadcrumbPage,
} from "@easykit/design";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "profile",
  })
  const { t } = useTranslation();
  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbPage>{t("个人资料")}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
  </MainPage>
}
