import { FC, PropsWithChildren, ReactNode, ReactElement, useEffect } from "react";
import { cloneElement } from 'react';
import { cn } from '@atom-ui/core';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingState, sidebarOpenState } from "@easy-kit/common/components/layout/admin/state";
import Switch from "@easy-kit/common/components/layout/admin/switch";
import {useLayoutState} from "@easy-kit/common/components/layout/admin/hooks";
import classNames from 'classnames';

export interface MenuItemProps {
    id: string;
    title: string;
    url: string;
    icon: ReactElement;
    external?: boolean;
    target?: string;
    group?: string;
    active?: boolean;
}

export interface SidebarProps extends PropsWithChildren {
    active?: string;
    logo?: ReactNode;
    navMenus?: MenuItemProps[];
    extendMenus?: MenuItemProps[];
}

const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        active = false,
        external = false
    } = props;

    const body = <div className={cn(
        "px-4 py-2 my-1 flex justify-start items-center text-[rgba(38,50,56,0.87)] rounded-md cursor-pointer relative",
        "hover:bg-[var(--action-hover)] hover:text-[#263238]",
        active ? "!bg-white before:absolute before:w-[4px] before:top-[9px] before:bottom-[9px] before:left-0 before:bg-primary before:rounded-r-lg" : null,
    )}>
        <span className={"flex justify-center items-center mr-3"}>{cloneElement(props.icon, {className: 'w-[20px] h-[20px]'})}</span>
        <span className={"text-sm"}>{ props.title }</span>
    </div>;

    return external ? <a href={props.url} target={props.target}>{body}</a> : <Link href={props.url}>{body}</Link>
}

const Sidebar: FC<SidebarProps> = (props) => {
    const {
        logo,
        navMenus = [],
        extendMenus = [],
        active,
    } = props;

    const loading = useRecoilValue(loadingState);
    const { sidebarOpen } = useLayoutState();

    return <div className={cn(
        "w-[var(--sidebar-width)] bg-[var(--sidebar-bg)] border-0 border-r border-solid border-[var(--border-color)]",
        sidebarOpen ? "flex" : "hidden",
        "flex-col flex-shrink-0",
    )}>
        <div className={"bg-[var(--sidebar-user-bg)] text-white p-2"}>
            <div className={"flex justify-center items-center"}>
                <div className={classNames(loading ? "animate-spin" : "")}>
                    { logo }
                </div>
                <div className={"flex-1 flex justify-end items-center"}>
                    icon s
                </div>
            </div>
        </div>
        <div className={cn(
            "border-0 border-solid border-b border-[var(--border-color)] h-[var(--header-height)]",
            "flex justify-center items-center"
        )}>
            <Switch />
        </div>
        <div className={"flex-1"}>
            { navMenus.map((menu) => <MenuItem key={menu.id} {...menu} active={active === menu.id} />) }
        </div>
        <div className={"border-0 border-solid border-t border-[var(--border-color)]"}>
            { extendMenus.map((menu) => <MenuItem key={menu.id} {...menu} active={active === menu.id} />) }
        </div>
    </div>
};

export default Sidebar;
