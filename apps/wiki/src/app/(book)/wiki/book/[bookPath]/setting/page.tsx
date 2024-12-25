import {keywords, title} from "@clover/public/utils/seo";
import { t } from '@clover/public/locale';
import {Metadata} from "next";
import {BookSettingPage} from "@/components/pages/book/setting";
import {FC} from "react";
import {PageProps, PromisePageProps} from "@/types/pages/page";
import {detail} from "@/rest/book";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("设置")),
        keywords: keywords(),
    }
}

const Page: FC<PromisePageProps> = async (props) => {
    const { params } = props;
    const {bookPath} = await params;
    const { data } = await detail(bookPath);
    return  <BookSettingPage data={data} />
}

export default Page;
