'use client';

import {
  RootLayout as PublicRootLayout,
  type RootLayoutProps as PublicRootLayoutProps,
} from '@clover/public/components/layout/root'
import type { FC } from 'react'
import "@/plugin/locales";
import i18next from 'i18next'

export type RootLayoutProps = PublicRootLayoutProps;

export const RootLayout: FC<RootLayoutProps> = (props) => {
  i18next.changeLanguage(props.locale)
  return <PublicRootLayout {...props} /> 
}
