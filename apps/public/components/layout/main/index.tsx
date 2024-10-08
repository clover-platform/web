import "./style.css";
import { FC, PropsWithChildren, ReactNode, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Logo from "@clover/public/components/common/logo";
import { AdminLayoutLoading } from "@clover/public/components/layout/main/loading";
import Sidebar, { SidebarProps } from "@clover/public/components/layout/main/sidebar";
import {useGoLogin, useLayoutState} from "@clover/public/components/layout/hooks/main";
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
import {withQuery} from "@easy-kit/common/utils/path";

export type PathProps = {
    type: "item" | "link";
    title: string;
    href?: string;
    withQuery?: boolean|string[];
    external?: boolean;
    target?: string;
}

export interface MainLayoutProps extends PropsWithChildren {
    sidebarProps?: SidebarProps;
    path?: PathProps[];
    className?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const { path, className } = props;
    const {loading, isLogin} = useLayoutState();
    const teams = useRecoilValue(teamsState);
    const open = useSidebarState();
    const searchParams = useSearchParams();
    useGoLogin();

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
                        {
                            item.external ? <a target={item.target} href={withQuery(item.href!, item.withQuery, searchParams)} className={"flex items-center"}>
                                {item.title}
                            </a> : <Link href={withQuery(item.href!, item.withQuery, searchParams)} className={"flex items-center"}>
                                {item.title}
                            </Link>
                        }
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
    }, [path, searchParams])

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
                                    <a href={"/{#LANG#}/"} className={"flex items-center"}>
                                        <IconHome />
                                    </a>
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
