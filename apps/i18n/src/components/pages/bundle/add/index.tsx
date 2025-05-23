'use client';

import { TitleBar } from "@clover/public/components/common/title-bar";
import { Button, Space, useMessage } from "@easykit/design";
import BackButton from "@clover/public/components/common/button/back";
import { useState } from "react";
import { BundleForm } from "@/components/pages/bundle/form";
import { create, AddBundleData } from "@/rest/bundle";
import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@clover/public/components/layout/hooks/use.layout.config";
import { ModuleLayoutProps } from "@/components/layout/module";
import { useModule } from "@/hooks/use.module";
import { useTranslation } from "react-i18next";

export const AddBundlePage = () => {
  const m = useModule();
  useLayoutConfig<ModuleLayoutProps>({
    active: "download"
  })
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  const router = useRouter();

  const onSubmit = async (data: AddBundleData) => {
    setLoading(true);
    data.module = m;
    const { success, message } = await create(data);
    setLoading(false);
    if (success) {
      router.push(`/i18n/${m}/bundle`);
    } else {
      msg.error(message);
    }
  }

  return <>
    <TitleBar title={t("添加文件")} />
    <BundleForm onSubmit={onSubmit}>
      <Space>
        <Button loading={loading} type={"submit"}>{t("提交")}</Button>
        <BackButton />
      </Space>
    </BundleForm>
  </>
}
