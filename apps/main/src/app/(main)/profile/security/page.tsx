import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/locale';
import {Metadata} from "next";
import {AccessTokensPage} from "@/components/pages/profile/access/tokens";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("访问令牌")),
    keywords: keywords(),
  }
}

const Page = () => <AccessTokensPage/>

export default Page;
