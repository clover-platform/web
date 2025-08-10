import { Search } from './search'
import { Sidebar } from './sidebar'

import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import {
  MainLayout as PublicMainLayout,
  type MainLayoutProps as PublicMainLayoutProps,
} from '@clover/public/components/layout/main'
import { useUnauthorizedHandle } from '@clover/public/hooks/use.unauthorized.handle'

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string
}

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin)
  const { active } = props
  const { t } = useTranslation()
  const { isLogin } = useUnauthorizedHandle()

  return (
    <PublicMainLayout
      bodyClassName="flex w-full"
      className="bg-secondary dark:bg-background"
      container={false}
      footerProps={{
        enable: false,
      }}
      headerProps={{
        logoUrl: '/',
        appName: t('项目'),
        className: 'bg-background dark:bg-black/50 sticky top-0 z-50',
        extra: <Search />,
      }}
      loading={!isLogin}
    >
      <div className="sticky top-[var(--layout-header-height)] h-[calc(100vh-var(--layout-header-height))] w-72 border-border border-r bg-background dark:bg-black/50">
        <Sidebar active={active} />
      </div>
      <div className="flex flex-1 flex-col">{props.children}</div>
    </PublicMainLayout>
  )
}
