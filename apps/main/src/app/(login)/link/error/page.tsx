import LinkErrorPage from '@/components/pages/link/error'
import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('快捷登录 - 错误')),
    keywords: await keywords(),
  }
}

const Page = () => <LinkErrorPage/>

export default Page;
