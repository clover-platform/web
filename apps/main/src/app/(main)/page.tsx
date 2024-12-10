import {keywords, title} from "@clover/public/utils/seo";
import ProjectPage from "@/components/pages/project";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("首页")),
        keywords: keywords(),
    }
}

const Page = () => <ProjectPage />

export default Page;
