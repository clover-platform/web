import { keywords, title } from "@clover/public/utils/seo";
import { ModuleWorktopPage } from "@/components/pages/worktop";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("工作台")),
    keywords: await keywords(),
  };
}

export default function Page() {
  return <ModuleWorktopPage />;
}
