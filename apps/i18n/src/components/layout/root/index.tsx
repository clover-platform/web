'use client';

import {
  RootLayout as PublicRootLayout,
  type RootLayoutProps as PublicRootLayoutProps,
} from '@clover/public/components/layout/root'
import type { FC } from 'react'
import "@/plugin/rest.client";
import '@/plugin/locales'
import { languagesState } from '@/state/public'
import '@/plugin/rest.client'
import type { Language } from '@/types/public'

export type RootLayoutProps = PublicRootLayoutProps & {
  languages: Language[];
};

export const RootLayout: FC<RootLayoutProps> = (props) => {
  const { languages } = props
  return <PublicRootLayout
    {...props}
    atomValues={[
      [languagesState, languages]
    ]}
  />
}
