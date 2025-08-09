import type { FC } from 'react'
import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import {
  MainLayout as PublicMainLayout,
  type MainLayoutProps as PublicMainLayoutProps,
} from '@clover/public/components/layout/main'

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string
}

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin)

  return (
    <PublicMainLayout
      bodyClassName="bg-secondary"
      headerProps={{
        logoUrl: '/',
        // extra: <Header active={props.active}/>
      }}
    >
      {props.children}
    </PublicMainLayout>
  )
}
