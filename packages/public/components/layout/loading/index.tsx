import Logo from '@clover/public/components/common/logo'
import type { FC } from 'react'

export const LoadingLayout: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex min-h-[100vh] items-center justify-center bg-background">
      <Logo className="animate-spin bg-transparent" />
    </div>
  )
}
