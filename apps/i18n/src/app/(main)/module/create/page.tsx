import {keywords, title} from "@clover/public/utils/seo";
import {CreateModulePage} from "@/components/pages/module/create";
import {tt} from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(tt("创建模块")),
    keywords: keywords(),
  }
}

export default function Page() {
  return <CreateModulePage/>;
}
