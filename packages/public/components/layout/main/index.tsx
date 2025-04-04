import {FC, PropsWithChildren, useEffect, useMemo} from "react";
import {Header, HeaderProps} from "@clover/public/components/layout/main/header";
import {Footer, FooterProps} from "@clover/public/components/layout/main/footer";
import classNames from "classnames";
import {projectsState, teamsState} from "@clover/public/state/public";
import {useAtomValue} from "jotai";
import {LoginLayout} from "@clover/public/components/layout/login";
import {Guide} from "@clover/public/components/layout/main/guide";
import {isLoginState} from "@clover/public/state/account";
import {useAppsLoader} from "@clover/public/hooks/use.apps.loader";

export type MainLayoutProps = PropsWithChildren<{
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  bodyClassName?: string;
  className?: string;
  container?: boolean;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const {
    footerProps = {},
    headerProps = {},
    className,
    bodyClassName,
    children,
    container = true,
  } = props;
  const teams = useAtomValue(teamsState);
  const projects = useAtomValue(projectsState);
  const isLogin = useAtomValue(isLoginState);
  const needInit = useMemo(() => isLogin && (!teams?.length || !projects.length), [teams, projects, isLogin])
  const {load} = useAppsLoader();

  useEffect(() => {
    load().then();
  }, [load])

  return needInit ? <LoginLayout showLogo={false}>
    <Guide />
  </LoginLayout> : <div className={classNames("flex justify-center items-center flex-col min-h-[100vh]", className)}>
    <Header {...headerProps}/>
    <div className={classNames("flex-1 w-full", bodyClassName)}>
      {container ? <div className={"container py-4"}>{children}</div> : children}
    </div>
    <Footer {...footerProps}/>
  </div>
}
