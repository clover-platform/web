import { MainPage as PublicMainPage } from '@clover/public/components/common/page'
import type { FC, PropsWithChildren } from 'react'

export const MainPage: FC<PropsWithChildren<{ className?: string }>> = (props) => {
  return <PublicMainPage className="container py-md">{props.children}</PublicMainPage>
}
