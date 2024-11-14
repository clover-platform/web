'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {t} from "@easykit/common/utils/locale";
import {MainLayoutProps} from "@/components/layout/main";

export const TeamPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "overview.team",
        path: [
            {
                title: t("团队"),
                type: "item",
            }
        ],
    })

    return <div>
        TeamPage
    </div>
}
