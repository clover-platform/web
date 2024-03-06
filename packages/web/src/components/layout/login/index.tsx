import {PropsWithChildren} from "react";
import Logo from "@/components/common/logo";
import classNames from "classnames";
import Link from "@easy-kit/common/components/link";
import { LangSelect } from "@/components/common/select/lang";



const LoginLayout = (props: PropsWithChildren) => {
    return <div className={"flex justify-center w-full min-h-[100vh] flex-col"}>
        <div className={"flex-1 flex justify-center items-center flex-col p-4 mb-[--login-footer-height]"}>
            <div className={"mb-6"}>
                <Logo size={80} />
                <div className={"text-center font-bold text-xl mt-2"}>{"{#幸运草#}"}</div>
            </div>
            { props.children }
        </div>
        <div className={classNames(
            "fixed bottom-0 left-0 right-0 h-[var(--login-footer-height)] border-0 border-t bg-white",
            "flex justify-center items-center "
        )}>
            <div className={"container flex justify-center items-center"}>
                <div className={"flex-1 space-x-2"}>
                    <Link href={"#"}>{"{#探索#}"}</Link>
                    <Link href={"#"}>{"{#帮助#}"}</Link>
                    <Link href={"#"}>{"{#关于#}"}</Link>
                    <Link href={"#"}>{"{#社区论坛#}"}</Link>
                </div>
                <div className={"flex-1 space-x-2 flex justify-end"}>
                    <LangSelect />
                </div>
            </div>
        </div>
    </div>
};

export default LoginLayout;
