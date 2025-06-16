'use client'

import type { ModuleLayoutProps } from '@/components/layout/module'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTranslation } from 'react-i18next'
import { SettingBasePage } from '../../components/common/base-page'

export const ModuleSettingAIPage = () => {
  const { t } = useTranslation()

  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  return (
    <SettingBasePage title={t('AI')} active="ai">
      <div>coming soon</div>
    </SettingBasePage>
  )
}
