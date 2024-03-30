'use client';

import {SettingTabsTitle} from "@/components/pages/module/setting/tabs-title";
import {TitleBar} from "@clover/public/components/common/title-bar";

export const ModuleSettingPage = () => {
    return <>
        <TitleBar
            title={"{#设置#}"}
            border={false}
        />
        <SettingTabsTitle active={"general"} />
    </>
}
