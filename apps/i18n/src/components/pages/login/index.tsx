'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import type { LoginLayoutProps } from '@clover/public/components/layout/login'
import { PublicLoginPage } from '@clover/public/components/pages/login'
import type { FC, PropsWithChildren } from 'react'

export const LoginPage: FC<PropsWithChildren> = () => {
  useLayoutConfig<LoginLayoutProps>({
    showLogo: false,
  })
  return <PublicLoginPage />
}
