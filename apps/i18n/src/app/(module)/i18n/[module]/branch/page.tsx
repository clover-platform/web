import {keywords, title} from "@clover/public/utils/seo";
import { ModuleBranchPage } from "@/components/pages/branch";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("分支")),
        keywords: keywords(),
    }
}

export default function Page() {
    return <ModuleBranchPage />
}
