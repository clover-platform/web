import {FC, PropsWithChildren, ReactNode} from "react";
import {Header} from "@clover/public/components/layout/main/header";
import {Footer} from "@clover/public/components/layout/main/footer";

export type MainLayoutProps = PropsWithChildren<{
    headerExtend?: ReactNode;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const {headerExtend, children} = props;

    return <div className={"flex justify-center items-center flex-col min-h-[100vh]"}>
        <Header extend={headerExtend}/>
        <div className={"flex-1 w-full bg-secondary"}>
            {children}
        </div>
        <Footer />
    </div>
}
