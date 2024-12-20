"use client";

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {t} from "@clover/public/locale";

export const DashboardPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "dashboard",
        path: [
            {
                title: t("控制台"),
                type: "item",
            }
        ],
    })

    return <div>
        DashboardPage
    </div>
}
