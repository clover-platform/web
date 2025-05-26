import { IconHelpFill, IconSettingFill } from '@arco-iconbox/react-clover'
import {Apps} from "@clover/public/components/layout/main/header/apps";
import { Notice } from '@clover/public/components/layout/main/header/notice'
import {ProfileMenu} from "@clover/public/components/layout/main/header/profile-menu";
import { LayoutLogo } from '@clover/public/components/layout/main/logo'
import { isLoginState } from '@clover/public/state/account'
import { Action, Button, Separator } from '@easykit/design'
import classNames from "classnames";
import { useAtom } from 'jotai/index'
import Link from 'next/link'
import { type FC, type ReactNode, useMemo } from 'react'
import { useTranslation } from "react-i18next";

export type HeaderProps = {
  extra?: ReactNode
  appName?: string
  profileExtra?: ReactNode
  className?: string
  logoUrl?: string
}

export const Header: FC<HeaderProps> = (props) => {
  const {
    logoUrl,
    extra, appName, profileExtra, className
  } = props;
  const [isLogin] = useAtom(isLoginState);
  const { t } = useTranslation();

  const logo = useMemo(() => {
    return (
      <>
        <LayoutLogo />
        {appName ? <span className="font-bold text-lg"> · {appName}</span> : null}
      </>
    )
  }, [appName])

  return (
    <div className={classNames('flex h-[60px] w-full items-center justify-center border-b p-sm', className)}>
      <div className="flex flex-1 items-center justify-start space-x-2xl">
        <div className="flex items-center justify-center space-x-sm">
          <Apps />
          <Separator orientation="vertical" className="!h-6" />
          {logoUrl ? <Link href={logoUrl}>{logo}</Link> : logo}
        </div>
        <div className="flex-1">{extra}</div>
      </div>
      <div className="flex items-center justify-center space-x-xs">
        {isLogin ? (
          <>
            <Link href="/dashboard">
              <Button size="sm">{t('控制台')}</Button>
            </Link>
            <Notice />
            <Action className="!outline-none">
              <IconHelpFill />
            </Action>
            <Action className="!outline-none">
              <IconSettingFill />
            </Action>
            <ProfileMenu extra={profileExtra} />
          </>
        ) : (
          <>
            <Link href="/login">
              <Button size="sm">{t('登录')}</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" variant="outline">
                {t('注册')}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
