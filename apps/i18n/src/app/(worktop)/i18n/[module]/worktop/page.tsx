import {keywords, title} from "@clover/public/utils/seo";
import {ModuleWorktopPage} from "@/components/pages/worktop";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("工作台")),
        keywords: keywords(),
    }
}

export default function Page() {
    return <ModuleWorktopPage />;
}
