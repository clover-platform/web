import {keywords, title} from "@clover/public/utils/seo";
import ProjectPage from "@/components/pages/project";
import {Metadata} from "next";
import { st } from "@clover/public/utils/locale.server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await title(await st("项目")),
    keywords: await keywords(),
  }
}

const Page = () => <ProjectPage/>;

export default Page;
