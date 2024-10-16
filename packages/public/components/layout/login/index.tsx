import {FC, PropsWithChildren} from "react";
import Logo from "@clover/public/components/common/logo";
import classNames from "classnames";
import Link from "@easykit/common/components/link";
import { LangSelect } from "@clover/public/components/common/select/lang";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";

export type LoginLayoutProps = PropsWithChildren<{
    title?: string;
    showLogo?: boolean;
}>;

export const LoginLayout: FC<LoginLayoutProps> = (originProps) => {
    const props = useLayoutProps<LoginLayoutProps>(originProps);
    const {
        title= t("幸运草"),
        showLogo= true
    } = props;

    return <div className={"flex justify-center w-full min-h-[100vh] flex-col"}>
        <div className={"flex-1 flex justify-center items-center flex-col p-4 mb-[--login-footer-height]"}>
            {
                showLogo ? <div className={"mb-6"}>
                    <Logo size={80}/>
                    <div className={"text-center font-bold text-xl mt-2"}>{title}</div>
                </div> : null
            }
            {props.children}
        </div>
        <div className={classNames(
            "fixed bottom-0 left-0 right-0 h-[var(--login-footer-height)] border-0 border-t bg-white",
            "flex justify-center items-center "
        )}>
            <div className={"container flex justify-center items-center"}>
                <div className={"flex-1 space-x-2"}>
                    <Link href={"#"}>{t("探索")}</Link>
                    <Link href={"#"}>{t("帮助")}</Link>
                    <Link href={"#"}>{t("关于")}</Link>
                    <Link href={"#"}>{t("社区论坛")}</Link>
                </div>
                <div className={"flex-1 space-x-2 flex justify-end"}>
                    <LangSelect />
                </div>
            </div>
        </div>
    </div>
};
