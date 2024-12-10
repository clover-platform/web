import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale'
import {Metadata} from "next";
import {UserPage} from "@/components/pages/user";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("用户")),
        keywords: keywords(),
    }
}

const Page = () => <UserPage />;

export default Page;
