import { keywords, title } from "@clover/public/utils/seo";
import { ModuleSettingAPIPage } from "@/components/pages/setting/api";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("设置")),
    keywords: await keywords(),
  };
}

const Page = () => <ModuleSettingAPIPage />

export default Page;
