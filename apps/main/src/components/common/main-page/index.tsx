import type { FC, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { MainPage as PublicMainPage } from '@clover/public/components/common/page'

export const MainPage: FC<PropsWithChildren<{ className?: string }>> = (props) => {
  return <PublicMainPage className={classNames(props.className)}>{props.children}</PublicMainPage>
}
