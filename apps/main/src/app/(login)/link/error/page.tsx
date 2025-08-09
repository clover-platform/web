import LinkErrorPage from '../components/error'

import type { Metadata } from 'next'
import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('快捷登录 - 错误')),
    keywords: await keywords(),
  }
}

const Page = () => <LinkErrorPage />

export default Page
