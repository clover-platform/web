import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { HomePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("首页")),
    keywords: await keywords(),
  }
}

const Page = () => <HomePage /> 

export default Page;
