import classNames from "classnames";
import type { FC, PropsWithChildren } from 'react'

export type PageProps = PropsWithChildren<{
  className?: string;
}>

export const Page: FC<PageProps> = (props) => {
  return <div className={classNames('space-y-4', props.className)}>{props.children}</div>
}

export const MainPage = Page;
