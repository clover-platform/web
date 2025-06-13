'use client';

import {
  RootLayout as PublicRootLayout,
  type RootLayoutProps as PublicRootLayoutProps,
} from '@clover/public/components/layout/root'
import type { FC } from 'react'
import '@/plugin/locales'

export type RootLayoutProps = PublicRootLayoutProps;

export const RootLayout: FC<RootLayoutProps> = (props) => {
  return <PublicRootLayout {...props} />
}
