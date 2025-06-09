import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { SecurityPage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("安全设置")),
    keywords: await keywords(),
  }
}

const Page = () => <SecurityPage/>

export default Page
