import {keywords, title} from "@clover/public/utils/seo";
import {ModulePage} from "@/components/pages/module";
import { ModuleWorktopPage } from "@/components/pages/module/worktop";

export const metadata = {
    title: title("{#国际化#}"),
    keywords: keywords(),
}

export default function Page() {
    return <ModulePage />;
}
