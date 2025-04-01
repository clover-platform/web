'use client';

import {FC, PropsWithChildren} from "react";
import {PublicLoginPage} from "@clover/public/components/pages/login";
import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {LoginLayoutProps} from "@clover/public/components/layout/login";

export const LoginPage: FC<PropsWithChildren> = () => {
  useLayoutConfig<LoginLayoutProps>({
    showLogo: false,
  })
  return <PublicLoginPage />
}
