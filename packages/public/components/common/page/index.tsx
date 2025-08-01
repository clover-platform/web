import classNames from "classnames";
import type { FC, PropsWithChildren } from 'react'

export type PageProps = PropsWithChildren<{
  className?: string;
}>

export const Page: FC<PageProps> = (props) => {
  return <div className={classNames('flex flex-col gap-lg', props.className)}>{props.children}</div>
}

export const MainPage = Page;
