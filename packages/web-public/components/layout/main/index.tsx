import "./style.css";
import { FC, PropsWithChildren, ReactNode, useCallback, useEffect, useMemo } from "react";
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
import { LayoutNavbar } from "@clover/public/components/layout/main/navbar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@atom-ui/core";
import Link from "next/link";
import { IconHome } from "@arco-iconbox/react-clover";

export type PathProps = {
    type: "item" | "link";
    title: string;
    href?: string;
}

export interface MainLayoutProps extends PropsWithChildren {
    sidebarProps?: SidebarProps;
    path?: PathProps[];
    className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const { path, className } = props;
    const router = useRouter();
    const pathname = usePathname();
    const {loading, isLogin} = useLayoutState();
    const teams = useRecoilValue(teamsState);
    const open = useSidebarState();

    const goLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(pathname)}`)
    }, [pathname]);

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

    const items = useMemo(() => {
        const nodes: ReactNode[] = [];
        path?.forEach((item, index) => {
            let node = null;
            if(item.type === "link") {
                node = <BreadcrumbItem key={'item' + index}>
                    <BreadcrumbLink asChild={true}>
                        <Link href={item.href!} className={"flex items-center"}>
                            {item.title}
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            }else if(item.type === "item") {
                node = <BreadcrumbItem key={'item' + index}>
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                </BreadcrumbItem>
            }
            if(node) {
                nodes.push(node);
            }
            if(node && index !== path.length - 1) {
                nodes.push(<BreadcrumbSeparator key={'separator' + index} className={"flex items-center"} />);
            }
        });
        return nodes;
    }, [path])

    return showLoading ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"}/>
    </div> : showGuide ? <Guide /> : <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar {...props.sidebarProps!}/>
        <div className={classNames(
            "flex-1 w-0",
            open && "ml-[var(--sidebar-width)]"
        )}>
            <LayoutNavbar className={"sticky top-0 z-50 bg-white"}>
                {
                    path ? <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild={true}>
                                    <Link href={"/{#LANG#}/"} className={"flex items-center"}>
                                        <IconHome />
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className={"flex items-center"} />
                            { items }
                        </BreadcrumbList>
                    </Breadcrumb> : null
                }
            </LayoutNavbar>
            <div className={classNames("container p-4", className)}>{ props.children }</div>
        </div>
        <AdminLayoutLoading />
    </div>
};
