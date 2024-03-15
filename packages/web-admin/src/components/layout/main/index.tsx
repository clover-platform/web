import { MainLayout as PublicMainLayout, PathProps } from "@clover/public/components/layout/main";
import {FC, PropsWithChildren} from "react";
import { NAV_MENUS } from "@/config/layout/main";

export type MainLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & PropsWithChildren;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    return <PublicMainLayout
        {...props}
        sidebarProps={{
            menus: NAV_MENUS,
            title: "{#管理中心#}",
            active: props.active
        }}
    >
        { props.children }
    </PublicMainLayout>
}
