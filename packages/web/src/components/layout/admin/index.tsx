import {MainLayout, PathProps} from "@/components/layout/main";
import {FC, PropsWithChildren} from "react";
import {NAV_MENUS} from "@/config/layout/admin";

export type AdminLayoutProps = {
    active?: string;
    path: PathProps[];
    className?: string;
} & PropsWithChildren;

export const AdminLayout: FC<AdminLayoutProps> = (props) => {
    return <MainLayout
        {...props}
        menus={NAV_MENUS}
        title={"{#管理中心#}"}
    >
        {props.children}
    </MainLayout>
}
