import { keywords, title } from "@clover/public/utils/seo";
import { MemberPage } from "@/components/pages/member";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("成员")),
    keywords: await keywords(),
  };
}

const Page = () => <MemberPage />

export default Page;
