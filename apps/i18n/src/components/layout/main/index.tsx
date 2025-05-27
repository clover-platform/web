import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {
  MainLayout as PublicMainLayout,
  type MainLayoutProps as PublicMainLayoutProps,
} from '@clover/public/components/layout/main'
import {useUnauthorizedHandle} from "@clover/public/hooks/use.unauthorized.handle";
import type { FC } from 'react'
import { Header } from './header'

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string;
};

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin);
  useUnauthorizedHandle();

  return (
    <PublicMainLayout
      className="bg-secondary dark:bg-background"
      headerProps={{
        logoUrl: '/dashboard',
        className: 'bg-background dark:bg-black/50',
        extra: <Header active={props.active} />,
      }}
    >
      {props.children}
    </PublicMainLayout>
  )
}
