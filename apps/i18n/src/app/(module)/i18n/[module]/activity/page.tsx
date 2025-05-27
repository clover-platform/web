import { ActivityPage } from "@/components/pages/activity";
import { st } from '@clover/public/utils/locale.server';
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("动态")),
    keywords: await keywords(),
  }
}

const Page = () => <ActivityPage />

export default Page
