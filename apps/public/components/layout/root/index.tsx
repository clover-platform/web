'use client';

import { RecoilRoot } from 'recoil';
import {FC, PropsWithChildren} from "react";
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
import "@/plugin/rest.client";
import "@clover/public/plugin/rest.client";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {Account} from "@clover/public/types/account";
import {projectsState, teamsState} from "@clover/public/state/public";
import {accessState} from "@easy-kit/common/state/access";
TimeAgo.addLocale(zhCNAgo);
TimeAgo.addLocale(enAgo);

export type RootLayoutProps = PropsWithChildren<{
    isLogin: boolean;
    accountInfo?: Account;
    teams: any[];
    projects: any[];
}>;

export const RootLayout: FC<RootLayoutProps> = (props) => {
    const {
        children,
        isLogin,
        accountInfo,
        teams,
        projects,
    } = props;

    return <html className={`{#LANG#}`}>
    <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
    </head>
    <body>
        <RecoilRoot initializeState={(snapshot) => {
            snapshot.set(isLoginState, isLogin);
            snapshot.set(teamsState, teams);
            snapshot.set(projectsState, projects);
            snapshot.set(accountInfoState, accountInfo || {
                id: 0,
                username: '',
                authorities: [],
                otpStatus: 0,
                currentProjectId: 0,
                currentTeamId: 0,
            });
            snapshot.set(accessState, accountInfo?.authorities || []);
        }}>
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
                { children }
            </ConfigProvider>
        </RecoilRoot>
    </body>
    </html>
};
