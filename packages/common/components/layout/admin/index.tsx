import type { PropsWithChildren } from 'react';
import Sidebar, {SidebarProps} from "./sidebar";
import "./style.css";

export interface AdminLayoutProps extends PropsWithChildren {

}

const AdminLayout = (props: AdminLayoutProps & SidebarProps) => {
    return <div className={"layout-admin flex justify-center w-full items-stretch min-h-[100vh]"}>
        <Sidebar
            navMenus={props.navMenus}
            logo={props.logo}
            active={props.active}
        />
        <div className={"flex-1"}>
            { props.children }
        </div>
    </div>
};

export default AdminLayout;
