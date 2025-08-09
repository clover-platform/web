'use client'

import { SettingBasePage } from '../../components/common/base-page'

import { useTranslation } from 'react-i18next'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import type { ModuleLayoutProps } from '@/components/layout/module'

export const ModuleSettingLanguagesPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  return (
    <SettingBasePage active="languages" title={t('语言')}>
      <div>coming soon</div>
    </SettingBasePage>
  )
}
