import "./style.css";
import {FC, PropsWithChildren, useCallback, useEffect} from "react";
import bus from '@easy-kit/common/events';
import {usePathname, useRouter} from "next/navigation";
import Logo from "@clover/public/components/common/logo";
import {useAccess} from "@easy-kit/common/hooks";
import { useInitLayoutState } from "@clover/public/components/layout/main/hooks";
import { AdminLayoutLoading } from "@clover/public/components/layout/main/loading";
import Sidebar from "@clover/public/components/layout/main/sidebar";
import classNames from "classnames";
import { LOGIN } from "@clover/public/events/account";

export interface MainLayoutProps extends PropsWithChildren {
    active?: string;
    loading?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const access = useAccess();
    const router = useRouter();
    const path = usePathname();
    const init = useInitLayoutState();

    const onLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(path)}`)
    }, [path]);

    useEffect(() => {
        bus.on(LOGIN, onLogin);
        return () => {
            bus.off(LOGIN, onLogin);
        }
    }, []);

    return (props.loading || !init) ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"} />
    </div> : <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar />
        <div className={"flex-1 w-0"}>
            { props.children }
        </div>
        <AdminLayoutLoading />
    </div>
};
