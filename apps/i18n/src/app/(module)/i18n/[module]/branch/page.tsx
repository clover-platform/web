import {keywords, title} from "@clover/public/utils/seo";
import { ModuleBranchPage } from "@/components/pages/branch";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("分支")),
    keywords: keywords(),
}

export default function Page() {
    return <ModuleBranchPage />;
}
