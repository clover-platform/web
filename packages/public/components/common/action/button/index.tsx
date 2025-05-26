import classNames from "classnames";
import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

export type ActionButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export const ActionButton: FC<ActionButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={classNames(
        'flex h-8 w-8 items-center justify-center rounded-sm',
        'border border-white/40 border-solid bg-white/10',
        'hover:bg-white/20',
        'focus:border-white/40 focus:bg-white/30',
        'active:border-white/40 active:bg-white/30',
        props.className
      )}
    >
      {props.children}
    </button>
  ) 
}
