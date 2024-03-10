import { FC, HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

export type ActionProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
    type?: 'dark' | 'light';
};

export const Action: FC<ActionProps> = (props) => {
    const {
        type = 'light',
        ...rest
    } = props;
    return <button
        {...rest}
        className={classNames(
            "w-8 h-8 flex justify-center items-center rounded-sm border border-transparent border-solid",
            type === 'light' && "hover:bg-white/20",
            type === 'light' && "focus:bg-white/30 focus:border-white/30",
            type === 'dark' && "hover:bg-[#ececef]",
            type === 'dark' && "focus:bg-[#ececef] focus:border-[#bfbfc3] focus:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            props.className
        )}
    >
        { props.children }
    </button>
}
