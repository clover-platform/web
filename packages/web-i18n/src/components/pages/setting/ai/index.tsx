'use client';

import {SettingTabsTitle} from "@/components/pages/setting/tabs-title";
import {TitleBar} from "@clover/public/components/common/title-bar";

export const ModuleSettingAIPage = () => {
    return <>
        <TitleBar
            title={"{#设置#}"}
            border={false}
        />
        <SettingTabsTitle active={"ai"} />
    </>
}
