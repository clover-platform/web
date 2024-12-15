import {FC, PropsWithChildren} from "react";
import {Header} from "@/components/layout/web/header";
import {Footer} from "@/components/layout/web/footer";

export type WebLayoutProps = PropsWithChildren<{}>;

export const WebLayout: FC<WebLayoutProps> = (props) => {
    return <div className={"flex justify-center items-center flex-col min-h-[100vh]"}>
        <Header />
        <div className={"flex-1 w-full bg-secondary"}>
            {props.children}
        </div>
        <Footer />
    </div>
}
