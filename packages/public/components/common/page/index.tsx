import {FC, PropsWithChildren} from "react";
import classNames from "classnames";

export type PageProps = PropsWithChildren<{
  className?: string;
}>

export const Page: FC<PageProps> = (props) => {
  return <div className={classNames("space-y-4", props.className)}>
    {props.children}
  </div>
}
