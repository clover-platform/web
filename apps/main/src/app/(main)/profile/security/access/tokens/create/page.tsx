import {keywords, title} from "@clover/public/utils/seo";
import {Metadata} from "next";
import {AccessTokensCreatePage} from "@/components/pages/profile/access/tokens/create";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("创建访问令牌")),
    keywords: await keywords(),
  }
}

const Page = () => <AccessTokensCreatePage/>

export default Page;
