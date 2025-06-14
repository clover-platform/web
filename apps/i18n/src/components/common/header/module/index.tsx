import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ModuleCollect } from './collect'

export const Module = () => {
  const { t } = useTranslation()
  return (
    <DropdownMenuContent className="w-96" align="start">
      <ModuleCollect />
      <DropdownMenuSeparator />
      <Link href="/">
        <DropdownMenuItem>{t('查看所有模块')}</DropdownMenuItem>
      </Link>
      <Link href="/module/create">
        <DropdownMenuItem>{t('创建模块')}</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  )
}