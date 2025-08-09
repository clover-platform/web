'use client'

import { SettingBasePage } from '../../components/common/base-page'

import { useTranslation } from 'react-i18next'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import type { ModuleLayoutProps } from '@/components/layout/module'

export const ModuleSettingAPIPage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  const { t } = useTranslation()
  return (
    <SettingBasePage active="api" title={t('API')}>
      <div>coming soon</div>
    </SettingBasePage>
  )
}
