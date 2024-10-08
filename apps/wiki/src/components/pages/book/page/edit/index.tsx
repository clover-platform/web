'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import {useSearchParams} from "next/navigation";
import {EditForm} from "@/components/pages/book/page/edit/form";

export const EditPage = () => {
    const search = useSearchParams();
    const pageId = search.get("page");

    useLayoutConfig<BookLayoutProps>({
        path: [
            {
                title: "{#知识库#}",
                type: "link",
                href: "/{#LANG#}/wiki/book/",
                withQuery: ["id"],
            },
            {
                title: "{#编辑#}",
                type: "item",
            }
        ],
    });

    return <EditForm pageId={pageId!} />
}
