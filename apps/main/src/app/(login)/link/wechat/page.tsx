import {keywords, title} from "@clover/public/utils/seo";
import LinkPage from "@/components/pages/link";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("快捷登录 - 微信")),
    keywords: keywords(),
  }
}

const Page = () => <LinkPage type={"wechat"}/>

export default Page;
