import "./style.css";
import {FC, PropsWithChildren, useCallback, useEffect} from "react";
import bus from '@easy-kit/common/events';
import {usePathname, useRouter} from "next/navigation";
import Logo from "@clover/public/components/common/logo";
import { AdminLayoutLoading } from "@clover/public/components/layout/main/loading";
import Sidebar from "@clover/public/components/layout/main/sidebar";
import { useLayoutState } from "@clover/public/components/layout/hooks/main";
import { UNAUTHORIZED } from "@clover/public/events/auth";

export interface MainLayoutProps extends PropsWithChildren {
    active?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const router = useRouter();
    const path = usePathname();
    const { loading, isLogin } = useLayoutState();

    const goLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(path)}`)
    }, [path]);

    useEffect(() => {
        bus.on(UNAUTHORIZED, goLogin);
        return () => {
            bus.off(UNAUTHORIZED, goLogin);
        }
    }, []);

    useEffect(() => {
        if(!loading && !isLogin) {
            goLogin();
        }
    }, [loading, isLogin])

    return loading || !isLogin ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"} />
    </div> : <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar />
        <div className={"flex-1 w-0"}>
            { props.children }
        </div>
        <AdminLayoutLoading />
    </div>
};
