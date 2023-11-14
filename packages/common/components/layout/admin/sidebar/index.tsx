import type { PropsWithChildren } from 'react';
import React from 'react';

export interface SidebarProps extends PropsWithChildren {}

const Sidebar = (props: SidebarProps) => {
    return <div className={"w-[250px] bg-[#f5f7f8] border-0 border-r-[1px] border-solid border-[rgba(38,50,56,0.1)]"}>
        sidebar
    </div>
};

export default Sidebar;
