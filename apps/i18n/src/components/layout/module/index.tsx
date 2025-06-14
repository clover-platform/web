import { useModuleInfo } from '@/hooks/use.module.info'
import { detail } from '@/rest/module'
import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import { MainLayout as PublicMainLayout } from '@clover/public/components/layout/main'
import { useUnauthorizedHandle } from '@clover/public/hooks'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { type FC, type PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from './header'

export type ModuleLayoutProps = {
  active?: string
  className?: string
} & PropsWithChildren

export const ModuleLayout: FC<ModuleLayoutProps> = (origin) => {
  const props = useLayoutProps<ModuleLayoutProps>(origin)
  useUnauthorizedHandle()
  const { t } = useTranslation()
  const { module } = useParams()
  const [_, setBaseInfo] = useModuleInfo()

  const { data, isFetched } = useQuery({
    queryKey: ['baseInfo', module],
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
      headerProps={{
        logoUrl: '/',
        appName: t('国际化'),
        className: 'bg-background dark:bg-black/50',
        extra: <Header active={props.active} />,
      }}
      footerProps={{ simple: true }}
      {...props}
    >
      {props.children}
    </PublicMainLayout>
  )
}
