'use client';

import {SettingTabsTitle} from "@/components/pages/setting/tabs-title";
import {TitleBar} from "@clover/public/components/common/title-bar";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {ModuleLayoutProps} from "@/components/layout/module";
import { t } from '@easykit/common/utils/locale';
import {useModule} from "@/hooks/use.module";

export const ModuleSettingLanguagesPage = () => {
    const m = useModule();
    useLayoutConfig<ModuleLayoutProps>({
        active: "setting",
        path: [
            {
                title: t("设置"),
                type: "link",
                href: `/i18n/${m}/setting`
            },
            {
                title: t("语言"),
                type: "item",
            }
        ],
    })
    return <>
        <TitleBar
            title={t("设置")}
            border={false}
        />
        <SettingTabsTitle active={"languages"} />
    </>
}
