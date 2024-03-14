import "./style.css";
import {FC, PropsWithChildren, useCallback, useEffect, useMemo} from "react";
import bus from '@easy-kit/common/events';
import {usePathname, useRouter} from "next/navigation";
import Logo from "@clover/public/components/common/logo";
import { AdminLayoutLoading } from "@clover/public/components/layout/main/loading";
import Sidebar, { SidebarProps } from "@clover/public/components/layout/main/sidebar";
import { useLayoutState } from "@clover/public/components/layout/hooks/main";
import { UNAUTHORIZED } from "@clover/public/events/auth";
import {useRecoilValue} from "recoil";
import {teamsState} from "@clover/public/state/public";
import {Guide} from "@clover/public/components/layout/main/guide";
import classNames from "classnames";
import { useSidebarState } from "@clover/public/components/layout/main/hooks";

export interface MainLayoutProps extends PropsWithChildren {
    sidebarProps?: SidebarProps;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const router = useRouter();
    const path = usePathname();
    const {loading, isLogin} = useLayoutState();
    const teams = useRecoilValue(teamsState);
    const open = useSidebarState();

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
        if (!loading && !isLogin) {
            goLogin();
        }
    }, [loading, isLogin])

    const showGuide = useMemo(() => {
        return !teams.length;
    }, [teams])

    const showLoading = useMemo(() => {
        return loading || !isLogin;
    }, [loading, isLogin]);

    return showLoading ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"}/>
    </div> : showGuide ? <Guide /> : <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar {...props.sidebarProps!}/>
        <div className={classNames(
            "flex-1 w-0",
            open && "ml-[var(--sidebar-width)]"
        )}>
            {props.children}
        </div>
        <AdminLayoutLoading />
    </div>
};
