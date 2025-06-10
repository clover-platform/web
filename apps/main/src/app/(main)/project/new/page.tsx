import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { NewProjectPage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("新建")),
    keywords: await keywords(),
  }
}

const Page = () => <NewProjectPage />

export default Page
