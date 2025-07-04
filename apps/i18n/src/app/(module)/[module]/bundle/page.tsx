import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { BundlePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('下载')),
    keywords: await keywords(),
  }
}

const Page = () => <BundlePage />

export default Page
