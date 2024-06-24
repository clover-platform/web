'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {Editor} from "@/components/common/editor";
import {useState} from "react";

export const IndexPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "wiki"
    })
    const [content, setContent] = useState<string>("");

    return <div className={"flex justify-center"}>
        <Editor
            value={content}
            onChange={setContent}
        />
    </div>
}
