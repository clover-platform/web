import { keywords, title } from "@clover/public/utils/seo";
import { AddBundlePage } from "@/components/pages/bundle/add";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("添加文件")),
    keywords: await keywords(),
  }
}

const Page = () => <AddBundlePage />

export default Page;
