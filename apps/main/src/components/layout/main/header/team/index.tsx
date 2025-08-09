import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { TeamCollect } from '@/components/layout/main/header/team/collect'

export const Team = () => {
  const { t } = useTranslation()
  return (
    <DropdownMenuContent align="start" className="w-96">
      <TeamCollect />
      <DropdownMenuSeparator />
      <Link href="/team">
        <DropdownMenuItem>{t('查看所有团队')}</DropdownMenuItem>
      </Link>
      <Link href="/team/new">
        <DropdownMenuItem>{t('创建团队')}</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  )
}
