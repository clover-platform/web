import "./style.css";
import type { PropsWithChildren, FC } from 'react';
import Sidebar, {SidebarProps} from "./sidebar";
import Header, {HeaderProps} from "@easy-kit/common/components/layout/admin/header";
import {useInitLayoutState} from "@easy-kit/common/components/layout/admin/hooks";
import {cn} from "@atom-ui/core";

export interface AdminLayoutProps extends PropsWithChildren<SidebarProps & HeaderProps> {
    hideHeader?: boolean
    bodyClassName?: string
}

const AdminLayout: FC<AdminLayoutProps> = (props) => {
    const {
        hideHeader = false,
        bodyClassName
    } = props;
    const sidebarProps: SidebarProps = {...props};
    const headerProps: HeaderProps = {...props};

    const init = useInitLayoutState();

    return init ? <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar {...sidebarProps} />
        <div className={"flex-1 px-2 w-0"}>
            { !hideHeader ? <Header {...headerProps} /> : null }
            <div className={cn(
                "m-2 mb-6",
                bodyClassName
            )}>
                { props.children }
            </div>
        </div>
    </div> : null;
};

export default AdminLayout;
