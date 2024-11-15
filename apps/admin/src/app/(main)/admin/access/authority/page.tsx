import {keywords, title} from "@clover/public/utils/seo";
import AuthorityPage from "@/components/pages/access/authority";
import { t } from '@easykit/common/utils/locale'
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("资源管理")),
        keywords: keywords(),
    }
}

const Page = () => <AuthorityPage />;

export default Page;
