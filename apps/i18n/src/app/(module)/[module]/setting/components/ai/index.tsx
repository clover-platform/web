'use client'

import type { ModuleLayoutProps } from '@/components/layout/module'
import { TitleBar } from '@clover/public/components/common/title-bar'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTranslation } from 'react-i18next'
import { SettingTabsTitle } from '../tabs-title'

export const ModuleSettingAIPage = () => {
  const { t } = useTranslation()

  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  return (
    <>
      <TitleBar title={t('设置')} border={false} />
      <SettingTabsTitle active="ai" />
    </>
  )
}
