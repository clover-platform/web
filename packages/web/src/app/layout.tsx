'use client';
import { PropsWithChildren, useEffect, useState } from "react";
import langList from "@/config/lang.list";
import {detectLang} from "@easy-kit/common/utils/layout";
import LayoutAdaptor from "@easy-kit/common/components/layout/adaptor";
import {routers} from "@/config/layout/router";
import "@/plugin/rest";
import '@/assets/style/index.scss';
import { StateRoot } from "@easy-kit/common/state/root";
import { ConfigProvider } from "@atom-ui/core";
import locales from "@/config/locale";
import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";

const AppRootLayout = ({children}: PropsWithChildren) => {
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        detectLang(langList as any).then((detected: boolean) => {
            if(!detected) setLoading(false);
        });
    }, []);

    const renderBody = () => {
        if(loading) return null;
        return <StateRoot>
            <ConfigProvider
                locale={locales['{#LANG#}']}
                onLocaleChange={(key) => {
                    i18next.init({
                        lng: key,
                        resources: {
                            'zh-CN': {zod: zhCNZod},
                            'en-US': {zod: enUSZod},
                        },
                    }).then();
                    z.setErrorMap(zodI18nMap);
                }}
            >
                <LayoutAdaptor routers={routers}>
                    { children }
                </LayoutAdaptor>
            </ConfigProvider>
        </StateRoot>
    }

    return <html className={`{#LANG#}`}>
        <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body>{renderBody()}</body>
    </html>
};

export default AppRootLayout;
