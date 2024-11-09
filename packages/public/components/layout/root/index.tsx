'use client';

import "@clover/public/plugin/rest.client";
import "@clover/public/plugin/locales";
import {MutableSnapshot, RecoilRoot} from 'recoil';
import {FC, PropsWithChildren, useEffect} from "react";
import { ConfigProvider } from "@easykit/design";
import locales from "@clover/public/config/locale";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {Account} from "@clover/public/types/account";
import {localeState, projectsState, teamsState} from "@clover/public/state/public";
import {accessState} from "@easykit/common/state/access";
import {sidebarOpenState} from "@clover/public/components/layout/main/state";
import i18next from "i18next";

export type RootLayoutProps = PropsWithChildren<{
    isLogin: boolean;
    accountInfo?: Account;
    teams: any[];
    projects: any[];
    sideOpen: boolean;
    locale: string;
    onInitState?: (snapshot: MutableSnapshot) => void;
}>;

export const RootLayout: FC<RootLayoutProps> = (props) => {
    const {
        children,
        isLogin,
        accountInfo,
        teams,
        projects,
        sideOpen,
        locale,
        onInitState,
    } = props;

    return <RecoilRoot initializeState={(snapshot) => {
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
        snapshot.set(sidebarOpenState, sideOpen);
        snapshot.set(localeState, locale);
        onInitState?.(snapshot);
        i18next.changeLanguage(locale).then();
    }}>
        <ConfigProvider locale={locales[locale]}>
            { children }
        </ConfigProvider>
    </RecoilRoot>
};
