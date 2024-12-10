import {keywords, title} from "@clover/public/utils/seo";
import { MemberPage } from "@/components/pages/member";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("成员")),
        keywords: keywords(),
    }
}

const Page = () => <MemberPage />

export default Page;
