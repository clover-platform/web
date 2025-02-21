'use client';

import "@clover/public/plugin/rest.client";
import "@clover/public/plugin/locales";
import "@clover/public/plugin/formatters";
import {Provider, WritableAtom} from 'jotai';
import {useHydrateAtoms} from 'jotai/utils'
import {FC, PropsWithChildren, ReactNode} from "react";
import {ConfigProvider} from "@easykit/design";
import locales from "@clover/public/config/locale";
import {accountInfoState, isLoginState} from "@clover/public/state/account";
import {Account} from "@clover/public/types/account";
import {localeState, projectsState, teamsState} from "@clover/public/state/public";
import {accessState} from "@clover/public/state/access";
import i18next from "i18next";
import {ThemeProvider} from "next-themes"

export type AtomValues = Iterable<
  readonly [WritableAtom<unknown, [any], unknown>, unknown]
>;

export type AtomsHydrateProps = {
  atomValues: AtomValues;
  children: ReactNode;
}

export const AtomsHydrate: FC<AtomsHydrateProps> = ({atomValues, children}) => {
  useHydrateAtoms(new Map(atomValues))
  return children;
}

export type RootLayoutProps = PropsWithChildren<{
  isLogin: boolean;
  accountInfo?: Account;
  teams: any[];
  projects: any[];
  sideOpen: boolean;
  locale: string;
  atomValues?: AtomValues;
}>;

export const RootLayout: FC<RootLayoutProps> = (props) => {
  const {
    children,
    isLogin,
    accountInfo,
    teams,
    projects,
    locale,
    atomValues = [],
  } = props;

  i18next.changeLanguage(locale).then();

  return <Provider>
    <AtomsHydrate atomValues={[
      [isLoginState, isLogin],
      [teamsState, teams],
      [projectsState, projects],
      [accountInfoState, accountInfo || {
        id: 0,
        username: '',
        authorities: [],
        otpStatus: 0,
        currentProjectId: 0,
        currentTeamId: 0,
      }],
      [accessState, accountInfo?.authorities || []],
      [localeState, locale],
      ...atomValues,
    ]}>
      <ConfigProvider locale={locales[locale]}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ConfigProvider>
    </AtomsHydrate>
  </Provider>
};
