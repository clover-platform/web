import {keywords, title} from "@clover/public/utils/seo";
import { DashboardPage } from "@/components/pages/dashboard";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";
import {ModulePageProps} from "@/types/pages/module";
import {dashboard} from "@/rest/module";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("概览")),
        keywords: keywords(),
    }
}

const Page = async (props: ModulePageProps)=> {
    const { success, data} = await dashboard(props.params.module);
    const { detail, languages, members, count } = (data || {});
    return <DashboardPage
        detail={detail}
        languages={languages}
        members={members}
        count={count}
    />
}

export default Page;
