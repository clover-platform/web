import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("价格")),
    keywords: keywords(),
  }
}

const Page = () => <div></div>

export default Page;
