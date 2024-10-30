import {keywords, title} from "@clover/public/utils/seo";
import {DetailPage} from "@/components/pages/book/page";
import {PageProps} from "@/types/pages/page";
import {detail} from "@/rest/page";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const {bookPath, pageId} = props.params;
    const {data} = await detail(bookPath, pageId);
    return {
        title: title(data?.title || t("详情")),
        keywords: keywords(),
    }
}

const Page = async (props: PageProps) => {
    const {bookPath, pageId} = props.params;
    const {data} = await detail(bookPath, pageId);
    return <DetailPage {...props} detail={data!} />;
}

export default Page;
