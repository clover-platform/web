'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@clover/public/locale";
import {MainLayoutProps} from "@/components/layout/main";

export const UserPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "overview.user",
        path: [
            {
                title: t("用户"),
                type: "item",
            }
        ],
    })

    return <div>
        UserPage
    </div>
}
