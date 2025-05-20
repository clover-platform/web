import {keywords, title} from "@clover/public/utils/seo";
import {LoginPage} from "@/components/pages/login";
import {Metadata} from "next";
import { st } from '@clover/public/utils/locale.server';
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("登录")),
    keywords: await keywords(),
  }
}

const Page = () => <LoginPage/>;

export default Page;
