import {Button, Separator} from "@easykit/design";
import {tt} from "@clover/public/locale";
import Link from "next/link";
import {LangSelect} from "@clover/public/components/common/select/lang";
import {useAtom} from "jotai/index";
import {isLoginState} from "@clover/public/state/account";
import {LayoutLogo} from "@clover/public/components/layout/main/logo";
import {FC, ReactNode} from "react";
import {ThemeSwitcher} from "@clover/public/components/common/theme-switcher";
import {Apps} from "@clover/public/components/layout/main/header/apps";

export type HeaderProps = {
  extend?: ReactNode;
  appName?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  const {extend, appName} = props;
  const [isLogin] = useAtom(isLoginState);

  return <div className={"w-full p-sm flex justify-center items-center border-b"}>
    <div className={"flex-1 flex justify-start items-center space-x-2xl"}>
      <div className={"space-x-sm flex justify-center items-center"}>
        <Apps/>
        <Separator orientation={"vertical"} className={"h-6"}/>
        <LayoutLogo/>
        {appName ? <span className={"text-lg font-bold"}> · {appName}</span> : null}
      </div>
      <div className={"flex-1"}>{extend}</div>
    </div>
    <div className={"space-x-xs flex justify-center items-center"}>
      <LangSelect className={"h-3xl"}/>
      <ThemeSwitcher size={"sm"}/>
      <Separator orientation={"vertical"} className={"h-6"}/>
      {
        isLogin ? <Link href={"/dashboard"}>
          <Button size={"sm"}>{tt("控制台")}</Button>
        </Link> : <>
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
