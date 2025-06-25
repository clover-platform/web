import { useQuerySync, useWorktopState } from "@/components/layout/worktop/hooks";
import Logo from '@clover/public/components/common/logo'
import type { LogoType } from '@clover/public/components/common/logo/ssr'
import { useGoLogin } from '@clover/public/components/layout/hooks/main'
import { useLayoutProps } from "@clover/public/components/layout/hooks/use.layout.props";
import { useTheme } from 'next-themes'
import type { FC, PropsWithChildren } from 'react'

export type WorktopLayoutProps = PropsWithChildren;

export const WorktopLayout: FC<WorktopLayoutProps> = (origin) => {
  const props = useLayoutProps<WorktopLayoutProps>(origin);
  const loading = useWorktopState();
  useGoLogin();
  useQuerySync();
  const theme = useTheme()

  return loading ? (
    <div className="flex min-h-[100vh] items-center justify-center">
      <Logo type={theme.resolvedTheme as LogoType} className="animate-spin bg-transparent" />
    </div>
  ) : (
    props.children
  )
}
