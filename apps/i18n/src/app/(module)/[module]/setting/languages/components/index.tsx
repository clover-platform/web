'use client'

import type { ModuleLayoutProps } from '@/components/layout/module'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTranslation } from 'react-i18next'
import { SettingBasePage } from '../../components/common/base-page'

export const ModuleSettingLanguagesPage = () => {
  const { t } = useTranslation()
  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  return (
    <SettingBasePage title={t('语言')} active="languages">
      <div>coming soon</div>
    </SettingBasePage>
  )
}
