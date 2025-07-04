import { st } from '@clover/public/utils/locale.server'
import {keywords, title} from "@clover/public/utils/seo";
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("价格")),
    keywords: await keywords(),
  }
}

const Page = () => <div /> 

export default Page;
