'use client';
import {PropsWithChildren, useEffect, useState} from 'react';
import { RecoilRoot } from 'recoil';
import langList from "@/config/lang.list";
import {detectLang} from "@clover/common/utils/layout";
import LayoutAdaptor from "@clover/common/components/layout/adaptor";
import {ConfigProvider} from "@arco-design/web-react";
import componentConfig from "@/config/component";
import {ARCO_LANG} from "@clover/common/config/arco";
import {routers} from "@/config/layout/router";

import '@/assets/style/reset.css';
import '@/assets/style/index.scss';
import '@clover/common/assets/style/font.scss';
import "@arco-themes/react-clover/css/arco.css";

const AppRootLayout = ({children}: PropsWithChildren) => {
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        detectLang(langList).then((detected: boolean) => {
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
                        <ConfigProvider componentConfig={componentConfig} locale={ARCO_LANG["{#LANG#}"]}>
                            {children}
                        </ConfigProvider>
                    </LayoutAdaptor>
                </RecoilRoot>
            }
        </body>
    </html>
};

export default AppRootLayout;
