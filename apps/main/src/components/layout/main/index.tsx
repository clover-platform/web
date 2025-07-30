import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {
  MainLayout as PublicMainLayout,
  type MainLayoutProps as PublicMainLayoutProps,
} from '@clover/public/components/layout/main'
import {useUnauthorizedHandle} from "@clover/public/hooks/use.unauthorized.handle";
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from './search'
import { Sidebar } from './sidebar'

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string;
};

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin);
  const { t } = useTranslation()
  const { isLogin } = useUnauthorizedHandle()

  return (
    <PublicMainLayout
      className="bg-secondary dark:bg-background"
      headerProps={{
        logoUrl: '/',
        appName: t('项目'),
        className: 'bg-background dark:bg-black/50',
        extra: <Search />,
      }}
      footerProps={{
        enable: false,
      }}
      loading={!isLogin}
      container={false}
      bodyClassName="flex w-full"
    >
      <div className="h-[calc(100vh-var(--layout-header-height))] w-64 border-border border-r bg-background dark:bg-black/50">
        <Sidebar />
      </div>
      <div className="flex-1">{props.children}</div>
    </PublicMainLayout>
  )
}
