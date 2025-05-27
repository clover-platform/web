import { MemberPage } from "@/components/pages/member";
import { st } from '@clover/public/utils/locale.server';
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("成员")),
    keywords: await keywords(),
  };
}

const Page = () => <MemberPage />

export default Page
