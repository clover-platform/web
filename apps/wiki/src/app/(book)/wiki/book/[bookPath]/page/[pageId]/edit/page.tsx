import {keywords, title} from "@clover/public/utils/seo";
import {EditPage} from "@/components/pages/book/page/edit";
import { t } from '@clover/public/locale';
import {PageProps} from "@/types/pages/page";
import {detail} from "@/rest/page";
import {Metadata} from "next";

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const {bookPath, pageId} = await props.params;
    const {data} = await detail(bookPath, pageId!);
    return {
        title: title(data?.title || t("编辑")),
        keywords: keywords(),
    }
}

const Page = async (props: PageProps) => {
    const {bookPath, pageId} = await props.params;
    const {data} = await detail(bookPath, pageId!);
    return <EditPage {...props} detail={data!} />;
}

export default Page;
