import {keywords, title} from "@clover/public/utils/seo";
import {DetailPage} from "@/components/pages/book/page";
import {PageProps, PromisePageProps} from "@/types/pages/page";
import {detail} from "@/rest/page";
import { t } from '@clover/public/locale';
import {Metadata} from "next";

export async function generateMetadata(props: PromisePageProps): Promise<Metadata> {
    const {bookPath, pageId} = await props.params;
    const {data} = await detail(bookPath, pageId!);
    return {
        title: title(data?.title || t("详情")),
        keywords: keywords(),
    }
}

const Page = async (props: PromisePageProps) => {
    const {bookPath, pageId} = await props.params;
    const {data} = await detail(bookPath, pageId!);
    return <DetailPage params={{bookPath, pageId}} detail={data!} />;
}

export default Page;
