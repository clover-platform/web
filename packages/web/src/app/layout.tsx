'use client';
import {PropsWithChildren, useEffect, useState} from 'react';
import { RecoilRoot } from 'recoil';
import langList from "@/config/lang.list";
import {detectLang} from "@clover/common/utils/layout";
import LayoutAdaptor from "@clover/common/components/layout/adaptor";
import { Toaster } from "@clover/core";
import {routers} from "@/config/layout/router";
import "@/plugin/rest";
import '@/assets/style/index.scss';

const AppRootLayout = ({children}: PropsWithChildren) => {
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        detectLang(langList as any).then((detected: boolean) => {
            if(!detected) setLoading(false);
        });
    }, []);

    return <html className={`{#LANG#}`}>
        <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body>
            {
                loading ? null : <RecoilRoot>
                    <LayoutAdaptor routers={routers}>
                        { children }
                    </LayoutAdaptor>
                </RecoilRoot>
            }
            <Toaster />
        </body>
    </html>
};

export default AppRootLayout;
