import {keywords, title} from "@clover/public/utils/seo";
import {InvitePage} from "@/components/pages/invite";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("加入翻译")),
        keywords: keywords(),
    }
}

const Page = () => <InvitePage />;

export default Page;
