import {keywords, title} from "@clover/public/utils/seo";
import {ModuleSettingPage} from "@/components/pages/setting";
import { st } from '@clover/public/utils/locale.server';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("设置")),
    keywords: await keywords(),
  };
}

const Page = () => <ModuleSettingPage />

export default Page;
