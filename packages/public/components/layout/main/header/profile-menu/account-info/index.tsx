import { Avatar } from '@easykit/design'
import { useAtomValue } from 'jotai'
import { accountInfoState } from '@clover/public/state/account'

export const AccountInfo = () => {
  const account = useAtomValue(accountInfoState)
  return (
    <div className="flex w-full items-start justify-start gap-3 p-2">
      <Avatar alt="cover" className="!w-10 mt-2 h-10" fallback={account.username.slice(0, 1)} src={account.avatar!} />
      <div className="flex-1 break-all">
        <div className="text-lg">{account.username}</div>
        <div className="text-secondary-foreground/50 text-sm">{account.email}</div>
      </div>
    </div>
  )
}
