import { recent } from '@/rest/project'
import { Input } from '@easykit/design'
import { useQuery } from '@tanstack/react-query'
import { t } from 'i18next'

export const RecentPanel = () => {
  const { data } = useQuery({
    queryKey: ['project', 'recent'],
    queryFn: () => recent({}),
  })

  console.log(data)

  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium">{t('最近')}</div>
      <div>
        <Input placeholder={t('搜索')} />
      </div>
    </div>
  )
}
