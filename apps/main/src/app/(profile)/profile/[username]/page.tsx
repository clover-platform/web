import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("个人资料")),
    keywords: keywords(),
  }
}

const Page = () => <>profile</>

export default Page;
