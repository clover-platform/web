import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import TaskGanttPage from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("甘特图")),
    keywords: await keywords(),
  }
}

const Page = () => <TaskGanttPage/>;

export default Page
