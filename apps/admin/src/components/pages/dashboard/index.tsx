'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@clover/public/locale";
import {MainLayoutProps} from "@/components/layout/main";

export const DashboardPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "overview.dashboard",
        path: [
            {
                title: t("仪表盘"),
                type: "item",
            }
        ],
    })

    return <div>
        DashboardPage
    </div>
}
