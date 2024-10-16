import {keywords, title} from "@clover/public/utils/seo";
import { DashboardPage } from "@/components/pages/dashboard";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("概览")),
    keywords: keywords(),
}

export default function Page() {
    return <DashboardPage />;
}
