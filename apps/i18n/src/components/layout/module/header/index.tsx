import { getNavs } from '../../main/header'
import { getNavs as getModuleNavs } from './config'

import { type FC, useMemo } from 'react'
import { Action, Button, Separator } from '@easykit/design'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { NavItem } from '@/components/common/header/nav-item'

export type HeaderProps = {
  active?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const { active } = props
  const { t } = useTranslation()
  const items = useMemo(() => {
    return getNavs().map((value) => <NavItem active={active} config={value} key={value.id} />)
  }, [active])
  const { module } = useParams()

  return (
    <ul className="flex items-center gap-2">
      {items}
      <Separator className="!h-4 mx-1" orientation="vertical" />
      {getModuleNavs().map((item) => (
        <li key={item.id}>
          <Link href={`/${module}/${item.href}`}>
            <Action active={active === item.id} className="!py-1 !outline-none space-x-1">
              <span>{t(item.title)}</span>
            </Action>
          </Link>
        </li>
      ))}
      <li>
        <Link href={`/${module}/all/worktop`}>
          <Button variant="outline">{t('工作台')}</Button>
        </Link>
      </li>
    </ul>
  )
}
