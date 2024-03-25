import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import classNames from "classnames";

export type ActionProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>> & {
    type?: 'dark' | 'light';
    active?: boolean;
    disabled?: boolean;
};

export const Action = forwardRef<HTMLButtonElement, ActionProps>((props, ref) => {
    const {
        type = 'dark',
        active = false,
        disabled = false,
        ...rest
    } = props;

    return <button
        {...rest}
        ref={ref}
        disabled={disabled}
        type={"button"}
        className={classNames(
            "p-2 flex justify-center items-center rounded-sm border border-transparent border-solid",
            type === 'light' && "hover:bg-white/20",
            type === 'light' && "focus:bg-white/30 focus:border-white/30",
            type === 'light' && "active:bg-white/30 active:border-white/30",
            type === 'dark' && "hover:bg-black/10",
            type === 'dark' && "focus:bg-[#ececef] focus:border-[#bfbfc3] focus:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            type === 'dark' && "active:bg-[#ececef] active:border-[#bfbfc3] active:shadow-[0_0_0_1px_#fff,0_0_0_3px_rgba(var(--primary))]",
            (active && type === 'light') && "bg-white/20",
            (active && type === 'dark') && "bg-black/10",
            disabled && "opacity-50 cursor-not-allowed hover:bg-transparent focus:bg-transparent active:bg-transparent focus:shadow-none active:shadow-none focus:border-transparent active:border-transparent",
            props.className
        )}
    >
        { props.children }
    </button>
})
