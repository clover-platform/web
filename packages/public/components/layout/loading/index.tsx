import type { FC } from 'react'
import Logo from '@clover/public/components/common/logo'

export const LoadingLayout: FC = () => {
  return (
    <div className="fixed inset-0 z-100 flex min-h-[100vh] items-center justify-center bg-background">
      <Logo className="animate-spin bg-transparent" />
    </div>
  )
}
