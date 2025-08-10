import { Header } from './header'

import { type FC, type PropsWithChildren, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import { MainLayout as PublicMainLayout } from '@clover/public/components/layout/main'
import { useUnauthorizedHandle } from '@clover/public/hooks'
import { useModuleInfo } from '@/hooks/use.module.info'
import { detail } from '@/rest/module'

export type ModuleLayoutProps = {
  active?: string
  className?: string
} & PropsWithChildren

export const ModuleLayout: FC<ModuleLayoutProps> = (origin) => {
  const props = useLayoutProps<ModuleLayoutProps>(origin)
  const { isLogin } = useUnauthorizedHandle()
  const { t } = useTranslation()
  const { module } = useParams()
  const [_, setBaseInfo] = useModuleInfo()

  const { data, isFetched } = useQuery({
    queryKey: ['module:base:info', module],
    queryFn: ({ queryKey }) => detail(queryKey[1] as string),
  })

  useEffect(() => {
    if (isFetched) {
      setBaseInfo(data)
    }
  }, [isFetched, data, setBaseInfo])

  return (
    <PublicMainLayout
      className="bg-secondary dark:bg-background"
      container={false}
      footerProps={{ simple: true }}
      headerProps={{
        logoUrl: '/',
        appName: t('国际化'),
        className: 'bg-background dark:bg-black/50 sticky top-0 z-50',
        extra: <Header active={props.active} />,
      }}
      loading={!isLogin}
      {...props}
    >
      {props.children}
    </PublicMainLayout>
  )
}
