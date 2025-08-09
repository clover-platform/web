'use client'

import type { FC } from 'react'
import {
  RootLayout as PublicRootLayout,
  type RootLayoutProps as PublicRootLayoutProps,
} from '@clover/public/components/layout/root'
import '@/plugin/locales'

export type RootLayoutProps = PublicRootLayoutProps

export const RootLayout: FC<RootLayoutProps> = (props) => {
  return <PublicRootLayout {...props} />
}
