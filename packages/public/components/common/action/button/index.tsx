import {FC, HTMLAttributes, PropsWithChildren} from "react";
import classNames from "classnames";

export type ActionButtonProps = {} & PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export const ActionButton: FC<ActionButtonProps> = (props) => {
    return <button
        {...props}
        className={classNames(
            "w-8 h-8 flex justify-center items-center rounded-sm",
            "border bg-white/10 border-white/40 border-solid",
            "hover:bg-white/20",
            "focus:bg-white/30 focus:border-white/40",
            "active:bg-white/30 active:border-white/40",
            props.className
        )}
    >
        {props.children}
    </button>
}
