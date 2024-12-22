import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale';
import {Metadata} from "next";
import {NewProjectPage} from "@/components/pages/project/new";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("新建")),
        keywords: keywords(),
    }
}

const Page = () => <NewProjectPage />;

export default Page;
