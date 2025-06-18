import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { SourcePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('资源')),
    keywords: await keywords(),
  }
}

export default function Page() {
  return <SourcePage />
}
