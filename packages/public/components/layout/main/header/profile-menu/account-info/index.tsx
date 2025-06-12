import { accountInfoState } from '@clover/public/state/account'
import {Avatar} from "@easykit/design";
import { useAtomValue } from 'jotai'

export const AccountInfo = () => {
  const account = useAtomValue(accountInfoState)
  return (
    <div className="flex items-center justify-center space-x-3 p-2">
      <Avatar src={account.avatar!} alt="cover" className="mt-1 h-10 w-10" />
      <div className="flex-1">
        <div className="text-lg">{account.username}</div>
        <div className="text-secondary-foreground/50 text-sm">{account.email}</div>
      </div>
    </div>
  )
}
