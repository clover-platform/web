import {keywords, title} from "@clover/public/utils/seo";
import {BookPage} from "@/components/pages/book";
import { t } from '@easykit/common/utils/locale';
import {Metadata} from "next";
import {FC} from "react";
import {PageProps} from "@/types/pages/page";
import {detail} from "@/rest/book";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("知识库")),
        keywords: keywords(),
    }
}

const Page: FC<PageProps> = async (props) => {
    const { params } = props;
    const {bookPath} = params;
    const { data } = await detail(bookPath);
    return <BookPage data={data} />
}

export default Page;
