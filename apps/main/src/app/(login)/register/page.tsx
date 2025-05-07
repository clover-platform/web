import {keywords, title} from "@clover/public/utils/seo";
import RegisterPage from "@/components/pages/register";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("注册")),
    keywords: keywords(),
  }
}

const Page = () => <RegisterPage/>;

export default Page;
