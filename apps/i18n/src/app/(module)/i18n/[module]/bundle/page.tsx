import { keywords, title } from "@clover/public/utils/seo";
import { BundlePage } from "@/components/pages/bundle";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("下载")),
    keywords: await keywords(),
  };
}

const Page = () => <BundlePage />

export default Page;
