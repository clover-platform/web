'use client'

import type { ModuleLayoutProps } from '@/components/layout/module'
import { useLayoutConfig } from '@clover/public/components/layout/hooks/use.layout.config'
import { useTranslation } from 'react-i18next'
import { SettingBasePage } from '../../components/common/base-page'

export const ModuleSettingAPIPage = () => {
  useLayoutConfig<ModuleLayoutProps>({
    active: 'setting',
  })
  const { t } = useTranslation()
  return (
    <SettingBasePage title={t('API')} active="api">
      <div>coming soon</div>
    </SettingBasePage>
  )
}
