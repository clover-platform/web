import Logo from '@clover/public/components/common/logo'
import type { LogoType } from '@clover/public/components/common/logo/ssr'
import { useTheme } from 'next-themes'
import type { FC } from 'react'

export const LoadingLayout: FC = () => {
  const theme = useTheme()
  return (
    <div className="fixed inset-0 z-50 flex min-h-[100vh] items-center justify-center bg-background">
      <Logo type={theme.resolvedTheme as LogoType} className="animate-spin bg-transparent" />
    </div>
  )
}
