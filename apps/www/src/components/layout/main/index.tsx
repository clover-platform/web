import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import {
  MainLayout as PublicMainLayout,
  type MainLayoutProps as PublicMainLayoutProps,
} from '@clover/public/components/layout/main'
import type { FC } from 'react'

export type MainLayoutProps = PublicMainLayoutProps & {
  active?: string
}

export const MainLayout: FC<MainLayoutProps> = (origin) => {
  const props = useLayoutProps<MainLayoutProps>(origin)

  return (
    <PublicMainLayout
      headerProps={{
        logoUrl: '/',
        // extra: <Header active={props.active}/>
      }}
      bodyClassName="bg-secondary"
    >
      {props.children}
    </PublicMainLayout>
  )
}
