import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import TaskPage from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("任务列表")),
    keywords: await keywords(),
  }
}

const Page = () => <TaskPage />

export default Page
