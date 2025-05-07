import {keywords, title} from "@clover/public/utils/seo";
import {Metadata} from "next";
import {NewTeamPage} from "@/components/pages/team/new";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("新建")),
    keywords: await keywords(),
  }
}

const Page = () => <NewTeamPage />

export default Page;
