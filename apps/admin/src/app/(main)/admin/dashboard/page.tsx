import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale'
import {Metadata} from "next";
import {DashboardPage} from "@/components/pages/dashboard";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("管理中心")),
        keywords: keywords(),
    }
}

const Page = () => <DashboardPage />;

export default Page;
