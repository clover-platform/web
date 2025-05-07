import {keywords, title} from "@clover/public/utils/seo";
import {Metadata} from "next";
import {DashboardPage} from "@/components/pages/dashboard";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("控制台")),
    keywords: await keywords(),
  }
}

const Page = () => <DashboardPage/>;

export default Page;
