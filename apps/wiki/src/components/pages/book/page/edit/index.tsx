'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import {Editor} from "@/components/common/editor";
import {Action} from "@clover/public/components/common/action";
import {StarIcon} from "@radix-ui/react-icons";
import {Button, Input} from "@atom-ui/core";

export const EditPage = () => {
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
    })
    return <div className={"space-y-4"}>
        <div className={"flex justify-center items-center sticky top-[48px] -m-4 px-4 py-2 border-b"}>
            <div className={"flex-1"}>协作信息</div>
            <div className={"flex space-x-2"}>
                <Action>
                    <StarIcon />
                </Action>
                <Button>{"{#保存#}"}</Button>
            </div>
        </div>
        <div className={"px-16 max-w-[860px] mx-auto"}>
            <Input
                placeholder={"{#请输入标题#}"}
                className={"border-none p-0 m-0 py-4 h-auto rounded-none shadow-none focus-visible:ring-0 text-2xl"} />
            <Editor offsetTop={-48-53-64} />
        </div>
    </div>
}
