import { keywords, title } from "@clover/public/utils/seo";
import { InvitePage } from "@/components/pages/invite";
import { st } from '@clover/public/utils/locale.server';
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("加入翻译 'test' \"test\"")),
    keywords: await keywords(),
  }
}

const Page = () => <InvitePage />;

export default Page;
