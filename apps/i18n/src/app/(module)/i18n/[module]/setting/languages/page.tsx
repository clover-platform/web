import { keywords, title } from "@clover/public/utils/seo";
import { ModuleSettingLanguagesPage } from "@/components/pages/setting/languages";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("设置")),
    keywords: await keywords(),
  };
}

const Page = () => <ModuleSettingLanguagesPage />

export default Page;
