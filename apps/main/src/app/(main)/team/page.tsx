import {TeamPage} from "@/components/pages/team";
import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("团队")),
    keywords: await keywords(),
  }
}

const Page = () => <TeamPage />;

export default Page
