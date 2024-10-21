'use client';

import {
    RootLayoutProps as PublicRootLayoutProps,
    RootLayout as PublicRootLayout
} from "@clover/public/components/layout/root";
import {FC} from "react";
import "@/plugin/locales";

export type RootLayoutProps = PublicRootLayoutProps;

export const RootLayout: FC<RootLayoutProps> = (props) => {
    return <PublicRootLayout {...props}/>
}
