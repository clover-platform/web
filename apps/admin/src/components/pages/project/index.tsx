'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@clover/public/locale";
import {MainLayoutProps} from "@/components/layout/main";

export const ProjectPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "overview.project",
        path: [
            {
                title: t("项目"),
                type: "item",
            }
        ],
    })

    return <div>
        ProjectPage
    </div>
}
