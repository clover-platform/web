'use client'

import type { FC, PropsWithChildren } from 'react'
import { LoginLayout } from '@clover/public/components/layout/login'

const Layout: FC<PropsWithChildren> = (props) => <LoginLayout {...props} showLogo={false} />
export default Layout
