import { MainLayout as PublicMainLayout, PathProps } from "@clover/public/components/layout/main";
import { FC, PropsWithChildren, useMemo } from "react";
import { NAV_MENUS } from "@/config/layout/module";
import { useSearchParams } from "next/navigation";
import { cloneDeep } from "lodash";
import { useLanguagesInit } from "@/hooks/use.languages.init";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type ModuleLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & PropsWithChildren;

export const ModuleLayout: FC<ModuleLayoutProps> = (origin) => {
    const props = useLayoutProps<ModuleLayoutProps>(origin);
    const search = useSearchParams();
    const id = search.get("id");
    useLanguagesInit();

    const menus = useMemo(() => {
        return cloneDeep(NAV_MENUS).map((item) => {
            item.url = item.url + (id ? `?id=${id}` : "");
            return item;
        });
    }, [NAV_MENUS, id])

    return <PublicMainLayout
        {...props}
        path={[
            {
                title: t("国际化"),
                type: "link",
                href: "/{#LANG#}/i18n/"
            },
            ...(props.path || [])
        ]}
        sidebarProps={{
            menus: menus,
            title: t("国际化"),
            active: props.active
        }}
    >
        { props.children }
    </PublicMainLayout>
}
