import { FC, HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

export type ActionProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export const Action: FC<ActionProps> = (props) => {
    return <button
        {...props}
        className={classNames(
            "w-8 h-8 flex justify-center items-center rounded-sm",
            "hover:bg-white/20",
            props.className
        )}
    >
        { props.children }
    </button>
}
