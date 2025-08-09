'use client'

import { SettingBasePage } from '../../components/common/base-page'

import { useTranslation } from 'react-i18next'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import type { ModuleLayoutProps } from '@/components/layout/module'

export const ModuleSettingAIPage = () => {
  const { t } = useTranslation()

  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  return (
    <SettingBasePage active="ai" title={t('AI')}>
      <div>coming soon</div>
    </SettingBasePage>
  )
}
