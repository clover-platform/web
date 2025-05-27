'use client';
import { LoginLayout } from "@clover/public/components/layout/login";
import type { FC, PropsWithChildren } from 'react'
const Layout: FC<PropsWithChildren> = (props) => <LoginLayout {...props} showLogo={false}/>
export default Layout
