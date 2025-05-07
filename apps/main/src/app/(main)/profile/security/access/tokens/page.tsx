import {keywords, title} from "@clover/public/utils/seo";
import {Metadata} from "next";
import {AccessTokensPage} from "@/components/pages/profile/access/tokens";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("访问令牌")),
    keywords: await keywords(),
  }
}

const Page = () => <AccessTokensPage/>

export default Page;
