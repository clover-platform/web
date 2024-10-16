import {keywords, title} from "@clover/public/utils/seo";
import {ModulePage} from "@/components/pages/module";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("国际化")),
    keywords: keywords(),
}

export default function Page() {
    return <ModulePage />;
}
