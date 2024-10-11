import {FC, PropsWithChildren, useEffect, useState} from "react";
import langList from "@clover/public/config/lang.list";
import {detectLang} from "@easy-kit/common/utils/layout";
import "@clover/public/plugin/rest";
import { StateRoot } from "@easy-kit/common/state/root";
import { ConfigProvider } from "@easykit/design";
import locales from "@clover/public/config/locale";
import i18next from "i18next";
import * as z from "zod";
import { zodI18nMap } from "zod-i18n-map";
import zhCNZod from "zod-i18n-map/locales/zh-CN/zod.json";
import enUSZod from "zod-i18n-map/locales/en/zod.json";
import enAgo from 'javascript-time-ago/locale/en'
import zhCNAgo from 'javascript-time-ago/locale/zh'
import TimeAgo from "javascript-time-ago";

export type RootLayoutProps = PropsWithChildren<{}>;

export const RootLayout: FC<RootLayoutProps> = (props) => {
    const {
        children,
    } = props;
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
                    TimeAgo.addLocale(zhCNAgo);
                    TimeAgo.addLocale(enAgo);
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
                { children }
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
        <body>
            {renderBody()}
        </body>
    </html>
};
