import { Input } from '@easykit/design'
import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const SearchInput = () => {
  const { t } = useTranslation()
  return (
    <div className="relative w-6/12">
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center px-2">
        <Search size={16} />
      </div>
      <Input placeholder={t('搜索')} className="pl-8" />
    </div>
  )
}
