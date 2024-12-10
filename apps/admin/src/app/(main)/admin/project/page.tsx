import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale'
import {Metadata} from "next";
import {ProjectPage} from "@/components/pages/project";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("项目")),
        keywords: keywords(),
    }
}

const Page = () => <ProjectPage />;

export default Page;
