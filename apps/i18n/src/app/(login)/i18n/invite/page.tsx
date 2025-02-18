import {keywords, title} from "@clover/public/utils/seo";
import {InvitePage} from "@/components/pages/invite";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("加入翻译 'test' \"test\"")),
        keywords: keywords(),
    }
}

const Page = () => <InvitePage />;

export default Page;
