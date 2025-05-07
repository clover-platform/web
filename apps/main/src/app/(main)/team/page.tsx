import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";
import {TeamPage} from "@/components/pages/team";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("团队")),
    keywords: keywords(),
  }
}

const Page = () => <TeamPage />;

export default Page;
