import {NewProjectPage} from "@/components/pages/project/new";
import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("新建")),
    keywords: await keywords(),
  }
}

const Page = () => <NewProjectPage/>;

export default Page
