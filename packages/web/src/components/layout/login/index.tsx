import {PropsWithChildren} from "react";
import Logo from "@/components/common/logo";
import classNames from "classnames";

const LoginLayout = (props: PropsWithChildren) => {
    return <div className={"flex justify-center w-full min-h-[100vh] flex-col"}>
        <div className={"flex-1 flex justify-center items-center flex-col p-4 mb-[--login-footer-height]"}>
            <Logo size={60} />
            { props.children }
        </div>
        <div className={classNames(
            "fixed bottom-0 left-0 right-0 h-[var(--login-footer-height)] border-0 border-t bg-white",
            "flex justify-center items-center "
        )}>
            <div className={"container"}>
                footer
            </div>
        </div>
    </div>
};

export default LoginLayout;
