'use client';

import { SettingTabsTitle } from "@/components/pages/setting/tabs-title";
import { TitleBar } from "@clover/public/components/common/title-bar";
import { useLayoutConfig } from "@clover/public/components/layout/hooks/use.layout.config";
import { ModuleLayoutProps } from "@/components/layout/module";
import { useTranslation } from "react-i18next";

export const ModuleSettingAPIPage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: "setting",
  })
  const { t } = useTranslation();
  return <>
    <TitleBar
      title={t("设置")}
      border={false}
    />
    <SettingTabsTitle active={"api"} />
  </>
}
