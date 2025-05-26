import { TeamCollect } from '@/components/layout/main/header/team/collect'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const Team = () => {
  const { t } = useTranslation()
  return (
    <DropdownMenuContent className="w-96" align="start">
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
