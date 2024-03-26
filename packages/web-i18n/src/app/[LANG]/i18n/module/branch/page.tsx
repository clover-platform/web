import {keywords, title} from "@clover/public/utils/seo";
import { ModuleBranchPage } from "@/components/pages/module/branch";

export const metadata = {
    title: title("{#分支#}"),
    keywords: keywords(),
}

export default function Page() {
    return <ModuleBranchPage />;
}
