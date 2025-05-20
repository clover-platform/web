import { keywords, title } from "@clover/public/utils/seo";
import { ModuleBranchPage } from "@/components/pages/branch";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("分支")),
    keywords: await keywords(),
  }
}

export default function Page() {
  return <ModuleBranchPage />
}
