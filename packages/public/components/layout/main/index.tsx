import {LoginLayout} from "@clover/public/components/layout/login";
import { Footer, type FooterProps } from '@clover/public/components/layout/main/footer'
import {Guide} from "@clover/public/components/layout/main/guide";
import { Header, type HeaderProps } from '@clover/public/components/layout/main/header'
import {useAppsLoader} from "@clover/public/hooks/use.apps.loader";
import { isLoginState } from '@clover/public/state/account'
import { projectsState, teamsState } from '@clover/public/state/public'
import classNames from 'classnames'
import { useAtomValue } from 'jotai'
import { type FC, type PropsWithChildren, useEffect, useMemo } from 'react'
import { LoadingLayout } from '../loading'
import { useRestoreSettings } from './hooks'

export type MainLayoutProps = PropsWithChildren<{
  headerProps?: HeaderProps
  footerProps?: FooterProps
  bodyClassName?: string
  className?: string
  container?: boolean
  loading?: boolean
}>

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const {
    footerProps = {},
    headerProps = {},
    className,
    bodyClassName,
    children,
    container = true,
    loading = false,
  } = props
  const teams = useAtomValue(teamsState);
  const projects = useAtomValue(projectsState);
  const isLogin = useAtomValue(isLoginState);
  const needInit = useMemo(() => isLogin && !(teams?.length && projects.length), [teams, projects, isLogin])
  const {load} = useAppsLoader();
  useRestoreSettings()

  useEffect(() => {
    load().then();
  }, [load])

  return needInit ? (
    <LoginLayout showLogo={false}>
      <Guide />
    </LoginLayout>
  ) : (
    <>
      <div className={classNames('flex min-h-[100vh] flex-col items-center justify-center', className)}>
        <Header {...headerProps} />
        <div className={classNames('w-full flex-1', bodyClassName)}>
          {container ? <div className="container py-4">{children}</div> : children}
        </div>
        <Footer {...footerProps} />
      </div>
      {loading ? <LoadingLayout /> : null}
    </>
  )
}
