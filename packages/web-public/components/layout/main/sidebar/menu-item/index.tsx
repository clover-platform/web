import {cloneElement, FC, ReactElement, useEffect, useState} from "react";
import {cn, HoverCard, HoverCardContent, HoverCardTrigger} from "@atom-ui/core";
import Link from "next/link";
import { ChevronRightIcon } from '@radix-ui/react-icons';
import classNames from "classnames";

export const ITEM_HEIGHT = 36;

export type MenuItemProps = {
    id: string;
    title: string;
    url?: string;
    icon?: ReactElement;
    showIcon?: boolean;
    external?: boolean;
    target?: string;
    group?: string;
    active?: string;
    children?: MenuItemProps[];
}

export const hasActiveChild = (children?: MenuItemProps[], active?: string) => {
    return children?.some((child) => child.id === active);
}

export const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        id,
        active,
        external = false,
        showIcon = true,
        children,
    } = props;

    const hasActive = hasActiveChild(children, active);
    const [open, setOpen] = useState(hasActive);
    useEffect(() => {
        setOpen(hasActiveChild(children, active));
    }, [children, active])

    const iconClassName = "flex justify-center items-center w-4 h-4 transform-all duration-200 ease";

    const button = <button
        onClick={() => children?.length && setOpen(!open)}
        className={cn(
            "w-full px-4 py-1.5 my-0.5 flex justify-start items-center rounded-sm cursor-pointer relative pr-2 text-left",
            "hover:bg-[var(--action-hover)] hover:text-primary",
            "focus:bg-[rgba(31,30,36,0.08)] focus:border-[#bfbfc3] focus:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            "active:bg-[rgba(31,30,36,0.08)] active:border-[#bfbfc3] active:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            (hasActive && !open) || active === id ? "before:absolute before:w-[3px] before:top-1 before:bottom-1 before:left-1 before:bg-primary before:rounded-md" : null,
            (hasActive && !open) || active === id ? "text-primary !bg-[rgba(31,30,36,0.08)] font-bold" : null,
            showIcon ? "pl-4" : "pl-2",
        )}
    >
        {
            showIcon ? <span className={iconClassName}>
                {props.icon ? cloneElement(props.icon, {className: 'w-4 h-4'}) : null}
            </span> : null
        }
        <span className={"text-sm flex-1 mx-3"}>{props.title}</span>
        {
            children?.length ? <span
                className={classNames(
                    iconClassName,
                    open ? "rotate-90" : "rotate-0",
                )}
            >
                <ChevronRightIcon/>
            </span> : null
        }
    </button>;

    const body = children?.length ? <>
        <HoverCard>
            <HoverCardTrigger asChild>{button}</HoverCardTrigger>
            {
                open ? null : <HoverCardContent align={"start"} className="w-[calc(var(--sidebar-width)-50px)] ml-[calc(var(--sidebar-width)-5px)] -mt-[36px] p-1 bg-white">
                    {children?.map((menu) => <MenuItem key={menu.id} showIcon={false} {...menu} active={active}/>)}
                </HoverCardContent>
            }
        </HoverCard>
        <div
            className={"transition-all duration-200 ease overflow-hidden"}
            style={{
                height: open ? (children?.length || 0) * ITEM_HEIGHT : 0,
                overflow: open ? "visible" : "hidden",
            }}
        >
            {children?.map((menu) => <MenuItem key={menu.id} {...menu} active={active}/>)}
        </div>
    </> : button;

    if (!props.url) return body;
    return external ?
        <a className={"flex justify-start items-start"} href={props.url} target={props.target}>{body}</a> :
        <Link className={"flex justify-start items-start"} href={props.url}>{body}</Link>
}
