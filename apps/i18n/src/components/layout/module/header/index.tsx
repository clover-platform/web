import { NavItem } from '@/components/common/header/nav-item'
import { Action, Button, Separator } from '@easykit/design'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getNavs } from '../../main/header'
import { getNavs as getModuleNavs } from './config'

export type HeaderProps = {
  active?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const { active } = props
  const { t } = useTranslation()
  const items = useMemo(() => {
    return getNavs().map((value) => <NavItem key={value.id} config={value} active={active} />)
  }, [active])
  const { module } = useParams()

  return (
    <ul className="flex items-center gap-2">
      {items}
      <Separator orientation="vertical" className="!h-4 mx-1" />
      {getModuleNavs().map((item) => (
        <li key={item.id}>
          <Link href={`/${module}/${item.href}`}>
            <Action className="!py-1 !outline-none space-x-1" active={active === item.id}>
              <span>{t(item.title)}</span>
            </Action>
          </Link>
        </li>
      ))}
      <li>
        <Link href={`/i18n/${module}/worktop`}>
          <Button variant="outline">{t('工作台')}</Button>
        </Link>
      </li>
    </ul>
  )
}