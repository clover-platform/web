import {Button} from "@easykit/design";
import {tt} from "@clover/public/locale";
import Link from "next/link";
import {LangSelect} from "@clover/public/components/common/select/lang";
import {LayoutLogo} from "@/components/layout/web/logo";
import {useAtom} from "jotai/index";
import {isLoginState} from "@clover/public/state/account";

export const Header = () => {
    const [isLogin] = useAtom(isLoginState);

    return <div className={"w-full p-sm flex justify-center items-center border-b"}>
        <div className={"flex-1 flex justify-start items-center space-x-2xl"}>
            <LayoutLogo />
            <ul className={"flex justify-start items-center space-x-xl text-md"}>
                <li>
                    <Link href={"/product"}>{tt("产品")}</Link>
                </li>
                <li>
                    <Link href={"/price"}>{tt("价格")}</Link>
                </li>
            </ul>
        </div>
        <div className={"space-x-xs flex justify-center items-center"}>
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
            <LangSelect className={"h-3xl"} />
        </div>
    </div>
}
