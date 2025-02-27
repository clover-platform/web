import {FC, ReactNode} from "react";
import {Separator} from "@easykit/design";
import classNames from "classnames";

export type TitleBarProps = {
  title: ReactNode;
  actions?: ReactNode;
  border?: boolean;
}

export const TitleBar: FC<TitleBarProps> = (props) => {
  const {
    border = false,
  } = props;
  return <>
    <div className={classNames(
      "flex justify-center items-center min-h-9 px-1",
      !border && "mb-4"
    )}>
      <div className={"flex-1 mr-2 text-2xl font-bold"}>{props.title}</div>
      <div>{props.actions}</div>
    </div>
    {border ? <Separator className={"my-4"}/> : null}
  </>
}
