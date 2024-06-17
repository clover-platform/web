'use client';
import { RootLayout as PublicRootLayout } from "@clover/public/components/layout/root";
import { PropsWithChildren } from "react";
import "@/plugin/rest";
import '@/assets/style/index.scss';

const RootLayout = ({children}: PropsWithChildren) => {
    return <PublicRootLayout>{children}</PublicRootLayout>
}

export default RootLayout;
