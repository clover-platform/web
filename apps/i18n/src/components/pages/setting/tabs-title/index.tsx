import {TABS} from "@/config/pages/module/setting/tabs";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {FC, useCallback} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {withQuery} from "@easy-kit/common/utils/path";

export type SettingTabsTitleProps = {
    active: string;
}

const BASE = "/{#LANG#}/i18n/setting";

const PATH_MAP: Record<string, string> = {
    general: `${BASE}/`,
    languages: `${BASE}/languages/`,
    ai: `${BASE}/ai/`,
    api: `${BASE}/api/`,
}

export const SettingTabsTitle: FC<SettingTabsTitleProps> = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const onChange = useCallback((id: string) => {
        router.push(withQuery(PATH_MAP[id], true, searchParams));
    }, [searchParams])
    return <TabsTitle
        active={props.active}
        items={TABS}
        onChange={onChange}
    />
}
