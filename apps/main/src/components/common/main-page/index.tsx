import { MainPage as PublicMainPage } from '@clover/public/components/common/page'
import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'

export const MainPage: FC<PropsWithChildren<{ className?: string }>> = (props) => {
  return <PublicMainPage className={classNames('container py-md', props.className)}>{props.children}</PublicMainPage>
}
