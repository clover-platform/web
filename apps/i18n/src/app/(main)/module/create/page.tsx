import { st } from '@clover/public/utils/locale.server';
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { CreateModulePage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("创建模块")),
    keywords: await keywords(),
  }
}

export default function Page() {
  return <CreateModulePage />
}
