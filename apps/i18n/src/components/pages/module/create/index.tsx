'use client';

import {TitleBar} from "@clover/public/components/common/title-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator,
  Button, Card,
  Space,
  useMessage
} from "@easykit/design";
import BackButton from "@clover/public/components/common/button/back";
import ModuleForm from "@/components/pages/module/form";
import {useState} from "react";
import {create} from "@/rest/module";
import {useRouter} from "next/navigation";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {t, tt} from '@clover/public/locale';
import {MainPage} from "@clover/public/components/common/page";
import Link from "next/link";
import {AppBreadcrumb} from "@/components/common/app-breadcrumb";

export const CreateModulePage = () => {
  useLayoutConfig<MainLayoutProps>({
    active: "module",
  })
  const [loading, setLoading] = useState(false);
  const msg = useMessage();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    const {success, message} = await create(data);
    setLoading(false);
    if (success) {
      router.push("/");
    } else {
      msg.error(message)
    }
  }

  return <MainPage>
    <AppBreadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink asChild={true}>
          <Link href={"/"}>{tt("模块")}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator/>
      <BreadcrumbItem>
        <BreadcrumbPage>{tt("创建模块")}</BreadcrumbPage>
      </BreadcrumbItem>
    </AppBreadcrumb>
    <TitleBar title={t("创建模块")}/>
    <Card>
      <ModuleForm onSubmit={onSubmit}>
        <Space>
          <Button loading={loading} type={"submit"}>{t("提交")}</Button>
          <BackButton/>
        </Space>
      </ModuleForm>
    </Card>
  </MainPage>
}
