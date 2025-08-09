import { TranslationPage } from './components'

import type { Metadata } from 'next'
import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('翻译')),
    keywords: await keywords(),
  }
}

const Page = () => <TranslationPage />

export default Page
