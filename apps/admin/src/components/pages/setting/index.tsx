'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@clover/public/locale";
import {MainLayoutProps} from "@/components/layout/main";

export const SettingPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "setting",
        path: [
            {
                title: t("设置"),
                type: "item",
            }
        ],
    })

    return <div>
        SettingPage
    </div>
}
