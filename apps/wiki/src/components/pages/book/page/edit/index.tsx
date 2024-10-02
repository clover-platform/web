'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {BookLayoutProps} from "@/components/layout/book";
import {Editor, EditorRef} from "@/components/common/editor";
import {Action} from "@clover/public/components/common/action";
import {StarIcon} from "@radix-ui/react-icons";
import {Button, Input, Separator} from "@atom-ui/core";
import {useEffect, useMemo, useRef, useState} from "react";
import {i18n} from "@easy-kit/i18n/utils";
import classNames from "classnames";
import {useSearchParams} from "next/navigation";

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
    });
    const editorRef = useRef<EditorRef>(null);
    const [value, setValue] = useState<string>("");
    const search = useSearchParams();
    const pageId = search.get("page");

    const size = useMemo(() => {
        return editorRef.current?.editor?.storage.characterCount.characters() || 0;
    }, [editorRef, value])

    useEffect(() => {
        console.log(pageId);
    }, [pageId])

    return <div className={"space-y-4"}>
        <div className={"flex justify-center items-center sticky top-[48px] -m-4 px-4 py-2 border-b bg-white"}>
            <div className={"flex-1 flex justify-start items-center space-x-2"}>
                <div className={"flex justify-center items-center space-x-1"}>
                    <div
                        className={classNames(
                            "w-6 h-6 rounded-full bg-[url(~@clover/public/assets/image/default/avatar.png)] bg-contain bg-center",
                        )}
                    />
                    <div className={"bg-green-500 h-2 w-2 rounded-full"}/>
                    <span>{"{#已连接#}"}</span>
                </div>
                <Separator orientation={"vertical"} className={"h-6"}/>
                <span>{i18n("{#%size 字#}", {size})}</span>
            </div>
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
            <Editor
                ref={editorRef}
                offsetTop={-48-53-64}
                value={value}
                onChange={setValue}
            />
        </div>
    </div>
}
