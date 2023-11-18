import "./style.css";
import type { PropsWithChildren, FC } from 'react';
import Sidebar, {SidebarProps} from "./sidebar";
import Header, {HeaderProps} from "@clover/common/components/layout/admin/header";
import {useInitLayoutState} from "@clover/common/components/layout/admin/hooks";

export interface AdminLayoutProps extends PropsWithChildren<SidebarProps & HeaderProps> {
    hideHeader?: boolean
}

const AdminLayout: FC<AdminLayoutProps> = (props) => {
    const {
        hideHeader = false
    } = props;
    const sidebarProps: SidebarProps = {...props};
    const headerProps: HeaderProps = {...props};

    const init = useInitLayoutState();

    return init ? <div className={"layout-admin flex justify-center w-full items-stretch min-h-[100vh]"}>
        <Sidebar {...sidebarProps} />
        <div className={"flex-1 px-2"}>
            { !hideHeader ? <Header {...headerProps} /> : null }
            <div className={"m-2"}>
                { props.children }
            </div>
        </div>
    </div> : null;
};

export default AdminLayout;
