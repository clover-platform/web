import {keywords, title} from "@clover/public/utils/seo";
import RegisterPage from "@/components/pages/register";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("注册")),
    keywords: await keywords(),
  }
}

const Page = () => <RegisterPage/>;

export default Page;
