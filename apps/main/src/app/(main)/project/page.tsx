import ProjectPage from '@/components/pages/project'
import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("项目")),
    keywords: await keywords(),
  }
}

const Page = () => <ProjectPage/>;

export default Page
