import {FC, PropsWithChildren} from "react";
import {Header, HeaderNav} from "@clover/public/components/layout/main/header";
import {Footer} from "@clover/public/components/layout/main/footer";

export type MainLayoutProps = PropsWithChildren<{
    navs?: HeaderNav[];
    active?: string;
}>;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const {navs, children, active} = props;
    return <div className={"flex justify-center items-center flex-col min-h-[100vh]"}>
        <Header
            navs={navs}
            active={active}
        />
        <div className={"flex-1 w-full bg-secondary"}>
            {children}
        </div>
        <Footer />
    </div>
}
