import {keywords, title} from "@clover/public/utils/seo";
import ProjectPage from "@/components/pages/project";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("新建")),
        keywords: keywords(),
    }
}

const Page = () => <>new team</>;

export default Page;
