import {keywords, title} from "@clover/public/utils/seo";
import {t} from '@clover/public/locale';
import {Metadata} from "next";
import {NewTeamPage} from "@/components/pages/team/new";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("新建")),
    keywords: keywords(),
  }
}

const Page = () => <NewTeamPage />

export default Page;
