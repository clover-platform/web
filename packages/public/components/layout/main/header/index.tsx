import {Action, Button, Separator} from "@easykit/design";
import {tt} from "@clover/public/locale";
import Link from "next/link";
import {useAtom} from "jotai/index";
import {isLoginState} from "@clover/public/state/account";
import {LayoutLogo} from "@clover/public/components/layout/main/logo";
import {FC, ReactNode, useMemo} from "react";
import {Apps} from "@clover/public/components/layout/main/header/apps";
import {Notice} from "@clover/public/components/layout/main/header/notice";
import {IconHelpFill, IconSettingFill} from "@arco-iconbox/react-clover";
import {ProfileMenu} from "@clover/public/components/layout/main/header/profile-menu";
import classNames from "classnames";
import {ProjectSwitcher} from "@clover/public/components/layout/main/header/project-switcher";

export type HeaderProps = {
  extra?: ReactNode;
  appName?: string;
  profileExtra?: ReactNode;
  className?: string;
  logoUrl?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  const {
    logoUrl,
    extra, appName, profileExtra, className
  } = props;
  const [isLogin] = useAtom(isLoginState);

  const logo = useMemo(() => {
    return <>
      <LayoutLogo/>
      {appName ? <span className={"text-lg font-bold"}> · {appName}</span> : null}
    </>
  }, [appName])

  return <div className={classNames("w-full h-[60px] p-sm flex justify-center items-center border-b", className)}>
    <div className={"flex-1 flex justify-start items-center space-x-2xl"}>
      <div className={"space-x-sm flex justify-center items-center"}>
        <Apps/>
        <Separator orientation={"vertical"} className={"h-6"}/>
        { logoUrl ? <Link href={logoUrl}>{logo}</Link> : logo }
      </div>
      <div className={"flex-1"}>{extra}</div>
    </div>
    <div className={"space-x-xs flex justify-center items-center"}>
      {
        isLogin ? <>
          <Link href={"/dashboard"}>
            <Button size={"sm"}>{tt("控制台")}</Button>
          </Link>
          <Notice />
          <Action className={"!outline-none"}>
            <IconHelpFill />
          </Action>
          <Action className={"!outline-none"}>
            <IconSettingFill />
          </Action>
          <ProfileMenu extra={profileExtra} />
          <ProjectSwitcher />
        </> : <>
          <Link href={"/login"}>
            <Button size={"sm"}>{tt("登录")}</Button>
          </Link>
          <Link href={"/register"}>
            <Button size={"sm"} variant={"outline"}>{tt("注册")}</Button>
          </Link>
        </>
      }
    </div>
  </div>
}
