import Link from "@clover/public/components/common/link";
import {LangSelect} from "@clover/public/components/common/select/lang";
import { ThemeSwitcher } from '@clover/public/components/common/theme-switcher'
import { useLayoutProps } from '@clover/public/components/layout/hooks/use.layout.props'
import {Card} from "@easykit/design";
import classNames from 'classnames'
import type { FC, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next';
import { LayoutLogo } from "../main/logo";

export type LoginLayoutProps = PropsWithChildren<{  
  showLogo?: boolean;
  appName?: string;
}>;

export const LoginLayout: FC<LoginLayoutProps> = (originProps) => {
  const props = useLayoutProps<LoginLayoutProps>(originProps);
  const { t } = useTranslation();
  const { showLogo = true, appName } = props

  return (
    <div className="flex min-h-[100vh] w-full flex-col justify-center bg-secondary">
      <div className="mb-[--login-footer-height] flex flex-1 flex-col items-center justify-center p-8">
        <Card className="px-8 py-10 shadow-none">
          {showLogo ? (
            <a href="/" className="mb-6 flex items-center justify-center">
              <LayoutLogo />
              {appName ? <span className="ml-1 font-bold text-lg">· {appName}</span> : null}
            </a>
          ) : null}
          {props.children}
        </Card>
      </div>
      <div
        className={classNames(
          'fixed right-0 bottom-0 left-0 border-0 border-t',
          'flex items-center justify-center bg-white dark:bg-[#121212]'
        )}
      >
        <div className="container flex items-center justify-center">
          <div className="flex-1 space-x-2">
            <Link href="#">{t('探索')}</Link>
            <Link href="#">{t('帮助')}</Link>
            <Link href="#">{t('关于')}</Link>
            <Link href="#">{t('社区论坛')}</Link>
          </div>
          <div className="flex flex-1 justify-end space-x-2 py-2">
            <ThemeSwitcher size="sm" />
            <LangSelect />
          </div>
        </div>
      </div>
    </div>
  )
};
