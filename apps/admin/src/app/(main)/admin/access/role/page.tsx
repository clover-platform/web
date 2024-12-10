import {keywords, title} from "@clover/public/utils/seo";
import RolePage from "@/components/pages/access/role";
import { t } from '@clover/public/locale'
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("角色管理")),
        keywords: keywords(),
    }
}

const Page = () => <RolePage />;

export default Page;
