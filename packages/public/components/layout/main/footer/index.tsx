import { IconGithubCircle, IconX } from '@arco-iconbox/react-clover'
import {LangSelect} from "@clover/public/components/common/select/lang";
import {ThemeSwitcher} from "@clover/public/components/common/theme-switcher";
import { getNavGroups } from '@clover/public/components/layout/main/footer/config'
import { LayoutLogo } from '@clover/public/components/layout/main/logo'
import { Button, Input, Separator } from '@easykit/design'
import type { FC } from 'react'
import { useTranslation } from "react-i18next";

export type FooterProps = {
  simple?: boolean
  enable?: boolean
}

export const Footer: FC<FooterProps> = (props) => {
  const { simple = false, enable = true } = props
  const { t } = useTranslation()
  if (!enable) return null
  return simple ? (
    <div className="container flex flex-col items-center justify-center pb-lg">
      <Separator className="mb-lg" />
      <div className="flex w-full">
        <div className="flex flex-1 items-center justify-start space-x-lg">
          <div>© 2024 {t('Easy Kit')}</div>
          <div className="flex items-center justify-start space-x-sm">
            <IconGithubCircle className="text-2xl text-secondary-foreground/50" />
            <Separator orientation="vertical" className="h-4" />
            <IconX className="text-secondary-foreground/50 text-xl" />
          </div>
        </div>
        <div className="flex space-x-sm">
          <ThemeSwitcher size="sm" />
          <LangSelect className="!h-3xl" />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full border-t py-2xl pb-lg">
      <div className="container">
        <div className="flex">
          <div className="w-48">
            <LayoutLogo />
          </div>
          <ul className="ml-4xl flex flex-1">
            {getNavGroups().map((group) => {
              return (
                <li key={group.title} className="flex-1 space-y-xs">
                  <div className="text-base">{group.title}</div>
                  <ul className="space-y-2xs">
                    {group.items.map((item) => {
                      return (
                        <li key={item.title}>
                          <a className="text-secondary-foreground/50" href={item.href}>
                            {item.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
          <div className="w-96 space-y-xs">
            <div className="text-base">{t('订阅')}</div>
            <div className="space-y-2xs">
              <div className="text-secondary-foreground/50">{t('了解新版本、新功能、指南和案例研究。')}</div>
              <div className="relative">
                <Input className="bg-secondary" />
                <div className="absolute top-0 right-0 bottom-0 p-0.5">
                  <Button variant="outline" size="sm">
                    {t('订阅')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2xl flex items-end justify-center">
          <div className="flex-1 space-y-sm">
            <div>© 2024 {t('Easy Kit')}</div>
            <div className="flex items-center justify-start space-x-sm">
              <IconGithubCircle className="text-2xl text-secondary-foreground/50" />
              <Separator orientation="vertical" className="h-4" />
              <IconX className="text-secondary-foreground/50 text-xl" />
            </div>
          </div>
          <div className="flex space-x-sm">
            <ThemeSwitcher size="sm" />
            <LangSelect className="!h-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
