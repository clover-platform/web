import { MainLayout as PublicMainLayout, PathProps } from "@clover/public/components/layout/main";
import {FC, PropsWithChildren} from "react";
import { NAV_MENUS } from "@clover/public/config/layout/main";
import { useLanguagesInit } from "@/hooks/use.languages.init";

export type MainLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & PropsWithChildren;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    useLanguagesInit();
    return <PublicMainLayout
        {...props}
        sidebarProps={{
            menus: NAV_MENUS,
            title: "{#你的工作#}",
            active: props.active
        }}
    >
        { props.children }
    </PublicMainLayout>
}
