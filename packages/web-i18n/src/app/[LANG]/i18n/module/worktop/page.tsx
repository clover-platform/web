import {keywords, title} from "@clover/public/utils/seo";
import {ModuleWorktopPage} from "@/components/pages/module/worktop";
import { DashboardPage } from "@/components/pages/module/dashboard";

export const metadata = {
    title: title("{#工作台#}"),
    keywords: keywords(),
}

export default function Page() {
    return <ModuleWorktopPage />;
}
