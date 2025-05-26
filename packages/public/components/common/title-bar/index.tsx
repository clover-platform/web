import {Separator} from "@easykit/design";
import classNames from "classnames";
import type { FC, ReactNode } from 'react'

export type TitleBarProps = {
  title: ReactNode;
  actions?: ReactNode;
  border?: boolean;
}

export const TitleBar: FC<TitleBarProps> = (props) => {
  const {
    border = false,
  } = props;
  return (
    <>
      <div className={classNames('flex min-h-9 items-center justify-center px-1', !border && 'mb-4')}>
        <div className="mr-2 flex-1 font-bold text-2xl">{props.title}</div>
        <div>{props.actions}</div>
      </div>
      {border ? <Separator className="my-4" /> : null}
    </>
  )
}
