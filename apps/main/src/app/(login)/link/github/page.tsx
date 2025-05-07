import {keywords, title} from "@clover/public/utils/seo";
import LinkPage from "@/components/pages/link";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("快捷登录 - Github")),
    keywords: await keywords(),
  }
}


const Page = () => <LinkPage type={"github"}/>

export default Page;
