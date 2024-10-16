import {keywords, title} from "@clover/public/utils/seo";
import {DetailPage} from "@/components/pages/book/page";
import {PageProps} from "@/types/pages/page";
import {detail} from "@/rest/page";
import { t } from '@easykit/common/utils/locale';

export const metadata = {
    title: title(t("详情")),
    keywords: keywords(),
}

const Page = async (props: PageProps) => {
    const {bookId, pageId} = props.params;
    const {data} = await detail(bookId, pageId);
    return <DetailPage {...props} detail={data!} />;
}

export default Page;
