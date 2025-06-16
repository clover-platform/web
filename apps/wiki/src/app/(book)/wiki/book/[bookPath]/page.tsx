import {BookPage} from "@/components/pages/book";
import { detail } from '@/rest/book'
import {} from '@/types/module/page'
import { t } from '@clover/public/locale';
import { keywords, title } from '@clover/public/utils/seo'
import type { Metadata } from 'next'
import type { FC } from 'react'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title(t("知识库")),
        keywords: keywords(),
    }
}

const Page: FC<PromisePageProps> = async (props) => {
    const {bookPath} = await props.params;
    const { data } = await detail(bookPath);
    return <BookPage data={data} />
}

export default Page;
