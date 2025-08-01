import { st } from "@clover/public/utils/locale.server";
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import LinkPage from '../components'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("快捷登录 - 微信")),
    keywords: await keywords(),
  }
}

const Page = () => <LinkPage type="wechat" /> 

export default Page;
