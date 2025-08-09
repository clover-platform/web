import { DropdownMenuContent, DropdownMenuItem } from '@easykit/design'
import { useAtomValue } from 'jotai/index'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { accountInfoState } from '@clover/public/state/account'
export const Profile = () => {
  const account = useAtomValue(accountInfoState)
  const { t } = useTranslation()

  return (
    <DropdownMenuContent align="start" className="w-48">
      <Link href={`/profile/${account.username}`}>
        <DropdownMenuItem>{t('个人资料')}</DropdownMenuItem>
      </Link>
      <Link href="/profile/security">
        <DropdownMenuItem>{t('安全设置')}</DropdownMenuItem>
      </Link>
    </DropdownMenuContent>
  )
}
