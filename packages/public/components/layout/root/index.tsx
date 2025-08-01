'use client';

import "@clover/public/plugin/rest.client";
import "@clover/public/plugin/locales";
import '@clover/public/plugin/formatters'
import locales from "@clover/public/config/locale";
import { accessState } from '@clover/public/state/access'
import { accountInfoState, isLoginState } from '@clover/public/state/account'
import { commonConfigState } from '@clover/public/state/config'
import { localeState, projectsState, teamsState } from "@clover/public/state/public";
import type { Account } from '@clover/public/types/account'
import type { CommonConfig } from '@clover/public/types/config'
import type { Project } from '@clover/public/types/project'
import type { Team } from '@clover/public/types/team'
import { getQueryClient } from '@clover/public/utils/query'
import { ConfigProvider } from '@easykit/design'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import i18next from 'i18next'
import { Provider, type WritableAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'

export type AtomValues = Iterable<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  readonly [WritableAtom<unknown, [any], unknown>, unknown]
>;

export type AtomsHydrateProps = {
  atomValues: AtomValues;
  children: ReactNode;
}

export const AtomsHydrate: FC<AtomsHydrateProps> = ({ atomValues, children }) => {
  useHydrateAtoms(new Map(atomValues))
  return children;
}

export type RootLayoutProps = PropsWithChildren<{
  isLogin: boolean
  accountInfo?: Account
  teams: Team[]
  projects: Project[]
  locale: string
  config?: CommonConfig
  atomValues?: AtomValues
}>

export const RootLayout: FC<RootLayoutProps> = (props) => {
  const { children, isLogin, accountInfo, teams, projects, locale, config, atomValues = [] } = props

  i18next.changeLanguage(locale)
  const queryClient = getQueryClient()

  return (
    <NuqsAdapter>
      <I18nextProvider i18n={i18next} defaultNS="translation">
        <Provider>
          <AtomsHydrate
            atomValues={[
              [isLoginState, isLogin],
              [teamsState, teams],
              [projectsState, projects],
              [
                accountInfoState,
                accountInfo || {
                  id: 0,
                  username: '',
                  authorities: [],
                  otpStatus: 0,
                  currentProjectId: 0,
                  currentTeamId: 0,
                },
              ],
              [accessState, accountInfo?.authorities || []],
              [localeState, locale],
              [commonConfigState, config],
              ...atomValues,
            ]}
          >
            <ConfigProvider locale={locales[locale]}>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                <QueryClientProvider client={queryClient}>
                  {children}
                  <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
              </ThemeProvider>
            </ConfigProvider>
          </AtomsHydrate>
        </Provider>
      </I18nextProvider>
    </NuqsAdapter>
  )
};
