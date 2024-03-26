import {keywords, title} from "@clover/public/utils/seo";
import { CreateModulePage } from "@/components/pages/module/create";
import { ModuleBranchPage } from "@/components/pages/module/branch";

export const metadata = {
    title: title("{#创建模块#}"),
    keywords: keywords(),
}

export default function Page() {
    return <CreateModulePage />;
}
