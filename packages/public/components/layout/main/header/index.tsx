import {Button, Separator} from "@easykit/design";
import {tt} from "@clover/public/locale";
import Link from "next/link";
import {LangSelect} from "@clover/public/components/common/select/lang";
import {useAtom} from "jotai/index";
import {isLoginState} from "@clover/public/state/account";
import {LayoutLogo} from "@clover/public/components/layout/main/logo";
import {FC} from "react";
import {ThemeSwitcher} from "@clover/public/components/common/theme-switcher";
import {Apps} from "@clover/public/components/layout/main/header/apps";

export type HeaderNav = {
    title: string;
    href: string;
    id: string;
}

export type HeaderProps = {
    navs?: HeaderNav[];
    active?: string;
}

export const Header: FC<HeaderProps> = (props) => {
    const { navs } = props;
    const [isLogin] = useAtom(isLoginState);

    return <div className={"w-full p-sm flex justify-center items-center border-b"}>
        <div className={"flex-1 flex justify-start items-center space-x-2xl"}>
            <div className={"space-x-sm flex justify-center items-center"}>
                <Apps />
                <Separator orientation={"vertical"} className={"h-6"} />
                <LayoutLogo />
            </div>
            <ul className={"flex justify-start items-center space-x-xl text-md"}>
                {
                    navs?.map((nav, index) => {
                        return <li key={nav.id}>
                            <Link href={nav.href}>{nav.title}</Link>
                        </li>
                    })
                }
            </ul>
        </div>
        <div className={"space-x-xs flex justify-center items-center"}>
            <LangSelect className={"h-3xl"} />
            <ThemeSwitcher size={"sm"} />
            <Separator orientation={"vertical"} className={"h-6"} />
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
