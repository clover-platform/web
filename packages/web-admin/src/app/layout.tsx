'use client';
import {routers} from "@/config/layout/router";
import { RootLayout as PublicRootLayout } from "@clover/public/components/layout/root";
import { PropsWithChildren } from "react";

const RootLayout = ({children}: PropsWithChildren) => {
    return <PublicRootLayout routers={routers}>{children}</PublicRootLayout>
}

export default RootLayout;
