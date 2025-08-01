import { ProjectSwitcher } from '@clover/public/components/common/switcher/project'
import { useCurrentTeam } from '@clover/public/components/layout/hooks/main'
import { AccountInfo } from '@clover/public/components/layout/main/header/profile-menu/account-info'
import { useMainApp } from '@clover/public/hooks'
import { logout } from '@clover/public/rest/auth'
import { accountInfoState } from '@clover/public/state/account'
import {
  Action,
  Avatar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  useAlert,
  useMessage,
} from '@easykit/design'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { type FC, type ReactNode, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export type ProfileMenuProps = {
  extra?: ReactNode
}

export const ProfileMenu: FC<ProfileMenuProps> = (props) => {
  const { extra } = props
  const [open, setOpen] = useState(false)
  const alert = useAlert()
  const msg = useMessage()
  const account = useAtomValue(accountInfoState)
  const team = useCurrentTeam()
  const { t } = useTranslation()
  const mainApp = useMainApp()

  const exit = useCallback(() => {
    alert.confirm({
      title: t('退出'),
      description: t('是否要退出当前账号？'),
      onOk: async () => {
        const { success, message } = await logout()
        if (success) {
          location.href = '/'
        } else {
          msg.error(message)
        }
        return success
      },
    })
  }, [alert, msg, t])

  const isMainAppSameOrigin = useMemo(() => {
    if (!mainApp?.href) return false
    try {
      const mainAppUrl = new URL(mainApp.href, window.location.origin)
      return mainAppUrl.origin === window.location.origin
    } catch {
      return false
    }
  }, [mainApp?.href])

  const baseUrl = useMemo(() => {
    if (!isMainAppSameOrigin) {
      return `${mainApp?.href.split('/')[0]}//${mainApp?.href.split('/')[2]}/`
    }
    return '/'
  }, [isMainAppSameOrigin, mainApp?.href])

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Action className="!outline-none !rounded-full !p-0.5" active={open}>
          <Avatar className="h-7 w-7" src={account.avatar!} alt="cover" fallback={account.username.slice(0, 1)} />
        </Action>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-0">
        <AccountInfo />
        <DropdownMenuSeparator />
        {isMainAppSameOrigin ? (
          <Link href={`${baseUrl}profile/${account.username}`}>
            <DropdownMenuItem>{t('个人资料')}</DropdownMenuItem>
          </Link>
        ) : (
          <Link href={`${baseUrl}profile/${account.username}`} target="_blank" rel="noopener noreferrer">
            <DropdownMenuItem>{t('个人资料')}</DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem className="p-0">
          <ProjectSwitcher title={t('切换团队')} teamId={team?.id}>
            <div className="flex w-full items-center justify-start space-x-1 px-2 py-1.5">
              <span>{t('切换团队')}</span>
              <span className="text-secondary-foreground/60">{`@${team?.name}`}</span>
            </div>
          </ProjectSwitcher>
        </DropdownMenuItem>
        {extra}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={exit}>{t('退出')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
