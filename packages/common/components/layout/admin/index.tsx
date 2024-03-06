import "./style.css";
import { PropsWithChildren, FC } from "react";
import Sidebar, {SidebarProps} from "./sidebar";
import {useInitLayoutState} from "@easy-kit/common/components/layout/admin/hooks";
import {cn} from "@atom-ui/core";
import { AdminLayoutLoading } from "@easy-kit/common/components/layout/admin/loading";

export interface AdminLayoutProps extends PropsWithChildren<SidebarProps> {
    bodyClassName?: string
}

const AdminLayout: FC<AdminLayoutProps> = (props) => {
    const {
        bodyClassName
    } = props;
    const sidebarProps: SidebarProps = {...props};
    const init = useInitLayoutState();

    return init ? <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar {...sidebarProps} />
        <div className={"flex-1 w-0"}>
            <div className={cn(
                "container",
                bodyClassName
            )}>
                {props.children}
            </div>
        </div>
        <AdminLayoutLoading />
    </div> : null;
};

export default AdminLayout;
