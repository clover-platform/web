import { Input } from '@easykit/design'
import { t } from 'i18next'

export const RecentPanel = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">{t('最近')}</div>
      <div>
        <Input placeholder={t('搜索')} />
      </div>
    </div>
  )
}
