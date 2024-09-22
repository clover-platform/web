'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";

const ProjectPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "project",
        path: [
            {
                title: "{#项目#}",
                type: "item",
            }
        ],
    })
    return <>
        project
    </>
};

export default ProjectPage;
