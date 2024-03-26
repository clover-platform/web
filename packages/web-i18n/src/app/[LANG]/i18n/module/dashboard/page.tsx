import {keywords, title} from "@clover/public/utils/seo";
import { DashboardPage } from "@/components/pages/module/dashboard";
import { CreateModulePage } from "@/components/pages/module/create";

export const metadata = {
    title: title("{#概览#}"),
    keywords: keywords(),
}

export default function Page() {
    return <DashboardPage />;
}
