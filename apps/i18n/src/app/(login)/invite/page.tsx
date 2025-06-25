import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { InvitePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('加入翻译 \'test\' "test"')),
    keywords: await keywords(),
  }
}

const Page = () => <InvitePage />

export default Page
