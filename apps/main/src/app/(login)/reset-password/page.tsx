import {keywords, title} from "@clover/public/utils/seo";
import ResetPasswordPage from "@/components/pages/reset-password";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("找回密码")),
    keywords: keywords(),
  }
}

const Page = () => <ResetPasswordPage/>

export default Page;
