import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/locale';
import {Metadata} from "next";
import {SecurityPage} from "@/components/pages/profile/security";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("安全设置")),
    keywords: keywords(),
  }
}

const Page = () => <SecurityPage/>

export default Page;
