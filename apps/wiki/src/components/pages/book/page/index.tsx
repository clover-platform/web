'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import {useSearchParams} from "next/navigation";
import {Detail} from "@/components/pages/book/page/detail";

export const DetailPage = () => {
    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: "{#知识库#}",
                type: "link",
                href: "/{#LANG#}/wiki/book/",
                withQuery: ["id"],
            },
            {
                title: "{#详情#}",
                type: "item",
            }
        ],
    });
    const search = useSearchParams();
    const pageId = search.get("page");

    return <Detail pageId={pageId!}/>
}
