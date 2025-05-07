import {keywords, title} from "@clover/public/utils/seo";
import ProjectPage from "@/components/pages/project";
import {t} from '@clover/public/utils/i18next';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: title(t("项目")),
    keywords: keywords(),
  }
}

const Page = () => <ProjectPage/>;

export default Page;
