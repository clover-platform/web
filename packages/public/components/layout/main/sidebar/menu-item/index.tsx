import { cloneElement, FC, ReactElement } from "react";
import { cn } from "@atom-ui/core";
import Link from "next/link";

export type MenuItemProps = {
    id: string;
    title: string;
    url: string;
    icon: ReactElement;
    external?: boolean;
    target?: string;
    group?: string;
    active?: boolean;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        active = false,
        external = false
    } = props;

    const body = <div className={cn(
        "px-4 py-2 my-1 flex justify-start items-center text-[rgba(38,50,56,0.87)] rounded-md cursor-pointer relative",
        "hover:bg-[var(--action-hover)] hover:text-[#263238]",
        active ? "!bg-[rgba(31,30,36,0.08)] before:absolute before:w-1 before:top-1 before:bottom-1 before:left-0 before:bg-primary before:rounded-r-lg" : null,
    )}>
        <span className={"flex justify-center items-center mr-3"}>{cloneElement(props.icon, {className: 'w-[20px] h-[20px]'})}</span>
        <span className={"text-sm"}>{ props.title }</span>
    </div>;

    return external ? <a href={props.url} target={props.target}>{body}</a> : <Link href={props.url}>{body}</Link>
}
