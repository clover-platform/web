'use client';

import {SettingTabsTitle} from "@/components/pages/setting/tabs-title";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";

export const ModuleSettingAPIPage = () => {
    useLayoutConfig<ModuleLayoutProps>({
        active: "setting",
        path: [
            {
                title: "{#设置#}",
                type: "link",
                href: "/{#LANG#}/i18n/setting/",
                withQuery: true,
            },
            {
                title: "{#API#}",
                type: "item",
            }
        ],
    })
    return <>
        <TitleBar
            title={"{#设置#}"}
            border={false}
        />
        <SettingTabsTitle active={"api"} />
    </>
}
