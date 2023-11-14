import type { PropsWithChildren } from 'react';
import React from 'react';
import Sidebar from "@clover/common/components/layout/admin/sidebar";

export interface AdminLayoutProps extends PropsWithChildren {}

const AdminLayout = (props: AdminLayoutProps) => {
    return <div className={"flex justify-center w-full items-stretch min-h-[100vh]"}>
        <Sidebar />
        <div className={"flex-1"}>
            { props.children }
        </div>
    </div>
};

export default AdminLayout;
