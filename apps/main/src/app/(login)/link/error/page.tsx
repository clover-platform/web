import {keywords, title} from "@clover/public/utils/seo";
import LinkErrorPage from "@/components/pages/link/error";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("快捷登录 - 错误")),
    keywords: await keywords(),
  }
}

const Page = () => <LinkErrorPage/>

export default Page;
