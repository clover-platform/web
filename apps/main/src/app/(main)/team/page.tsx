import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { TeamPage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("团队")),
    keywords: await keywords(),
  }
}

const Page = () => <TeamPage />

export default Page
