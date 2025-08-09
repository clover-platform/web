import { ModuleCollect } from './collect'

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@easykit/design'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

export const Module = () => {
  const { t } = useTranslation()
  return (
    <DropdownMenuContent align="start" className="w-96">
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
