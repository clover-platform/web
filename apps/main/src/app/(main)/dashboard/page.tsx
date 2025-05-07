import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";
import {DashboardPage} from "@/components/pages/dashboard";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("控制台")),
    keywords: keywords(),
  }
}

const Page = () => <DashboardPage/>;

export default Page;
