'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {Editor} from "@/components/common/editor";

export const IndexPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "wiki"
    })
    return <div className={"flex justify-center"}>
        <Editor />
    </div>
}
