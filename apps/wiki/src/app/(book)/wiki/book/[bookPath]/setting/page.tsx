import { BookSettingPage } from '@/components/pages/book/setting'
import {detail} from "@/rest/book";
import {} from '@/types/module/page'
import { t } from '@clover/public/locale'
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import type { FC } from 'react'

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
