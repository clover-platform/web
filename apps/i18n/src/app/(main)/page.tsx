import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { ModulePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('国际化')),
    keywords: await keywords(),
  }
}

const Page = () => <ModulePage />

export default Page
