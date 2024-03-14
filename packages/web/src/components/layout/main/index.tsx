import { MainLayout as PublicMainLayout } from '@clover/public/components/layout/main';
import {FC, PropsWithChildren, ReactNode, useMemo} from "react";
import {Navbar} from "@/components/common/navbar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@atom-ui/core";
import Link from "next/link";
import {IconHome} from "@arco-iconbox/react-clover";
import classNames from "classnames";
import { NAV_MENUS } from "@/config/layout/main";
import {MenuItemProps} from "@clover/public/components/layout/main/sidebar/menu-item";

export type PathProps = {
    type: "item" | "link";
    title: string;
    href?: string;
}

export type MainLayoutProps = {
    active?: string;
    path: PathProps[];
    className?: string;
    menus?: MenuItemProps[];
    title?: string;
} & PropsWithChildren;

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const { className, path } = props;
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

    return <PublicMainLayout
        sidebarProps={{
            menus: props.menus || NAV_MENUS,
            title: props.title || "你的工作",
            active: props.active
        }}
    >
        <Navbar className={"sticky top-0"}>
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
        </Navbar>
        <div className={classNames("container p-2", className)}>{ props.children }</div>
    </PublicMainLayout>
}
