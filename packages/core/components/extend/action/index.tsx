import {FC, HTMLAttributes} from "react";
import {cn} from "@clover/core";

export interface ActionProps extends HTMLAttributes<HTMLDivElement>{
    className?: string;
}

export const Action: FC<ActionProps> = (props) => {
    return <div
        className={cn(
            "h-9 rounded-sm flex justify-center items-center cursor-pointer px-2",
            "hover:bg-[var(--action-hover)]",
            props.className,
        )}
        onClick={props.onClick}
    >
        { props.children }
    </div>
}
