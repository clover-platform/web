import {getTabs} from "@/config/pages/module/setting/tabs";
import {TabsTitle} from "@clover/public/components/common/tabs-title";
import {FC, useCallback} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {withQuery} from "@clover/public/utils/path";
import {useModule} from "@/hooks/use.module";

export type SettingTabsTitleProps = {
    active: string;
}

export const SettingTabsTitle: FC<SettingTabsTitleProps> = (props) => {
    const m = useModule();
    const router = useRouter();
    const searchParams = useSearchParams();
    const onChange = useCallback((id: string) => {
        router.push(`/i18n/${m}/setting${id === 'general' ? '' : "/"+id}`);
    }, [searchParams])

    return <TabsTitle
        active={props.active}
        items={getTabs()}
        onChange={onChange}
    />
}
