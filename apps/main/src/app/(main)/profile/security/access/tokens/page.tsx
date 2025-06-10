import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { AccessTokensPage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("访问令牌")),
    keywords: await keywords(),
  }
}

const Page = () => <AccessTokensPage/>

export default Page
