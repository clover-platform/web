import {keywords, title} from "@clover/public/utils/seo";
import ResetPasswordPage from "@/components/pages/reset-password";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("找回密码")),
    keywords: await keywords(),
  }
}

const Page = () => <ResetPasswordPage/>

export default Page;
