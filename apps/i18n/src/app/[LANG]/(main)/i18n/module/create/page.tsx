import {keywords, title} from "@clover/public/utils/seo";
import { CreateModulePage } from "@/components/pages/module/create";

export const metadata = {
    title: title(t("创建模块")),
    keywords: keywords(),
}

export default function Page() {
    return <CreateModulePage />;
}
