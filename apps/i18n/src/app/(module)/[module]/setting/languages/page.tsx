import { st } from '@clover/public/utils/locale.server'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { ModuleSettingLanguagesPage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st('设置')),
    keywords: await keywords(),
  }
}

const Page = () => <ModuleSettingLanguagesPage />

export default Page
