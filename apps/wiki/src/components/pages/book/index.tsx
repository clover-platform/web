'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";

export const BookPage = () => {
    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: t("知识库"),
                type: "item",
            }
        ],
        active: "home",
    })
    return <div>
        book
    </div>
}
