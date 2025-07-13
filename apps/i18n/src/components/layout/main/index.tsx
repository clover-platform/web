import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {
  MainLayout as PublicMainLayout,
  type MainLayoutProps as PublicMainLayoutProps,
} from '@clover/public/components/layout/main'
import {useUnauthorizedHandle} from "@clover/public/hooks/use.unauthorized.handle";
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from './header'

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string;
};

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin);
  const { isLogin } = useUnauthorizedHandle()
  const { t } = useTranslation()

  return (
    <PublicMainLayout
      className="bg-secondary dark:bg-background"
      headerProps={{
        logoUrl: '/',
        appName: t('国际化'),
        className: 'bg-background dark:bg-black/50',
        extra: <Header active={props.active} />,
      }}
      footerProps={{
        simple: true,
      }}
      loading={!isLogin}
    >
      {props.children}
    </PublicMainLayout>
  )
}
