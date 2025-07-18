import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import { ProductPage } from './components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("产品")),
    keywords: await keywords(),
  }
}

const Page = () => <ProductPage /> 

export default Page;
