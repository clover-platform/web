import type { FC, PropsWithChildren } from 'react'
import Logo from '@clover/public/components/common/logo'
import { useGoLogin } from '@clover/public/components/layout/hooks/main'
import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import { useQuerySync, useWorktopState } from '@/components/layout/worktop/hooks'

export type WorktopLayoutProps = PropsWithChildren

export const WorktopLayout: FC<WorktopLayoutProps> = (origin) => {
  const props = useLayoutProps<WorktopLayoutProps>(origin)
  const loading = useWorktopState()
  useGoLogin()
  useQuerySync()

  return loading ? (
    <div className="flex min-h-[100vh] items-center justify-center">
      <Logo className="animate-spin bg-transparent" />
    </div>
  ) : (
    props.children
  )
}
