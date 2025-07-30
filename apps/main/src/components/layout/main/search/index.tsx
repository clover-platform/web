import { Button } from '@easykit/design'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SearchInput } from './input'

export const Search = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-1 items-center justify-center gap-2">
      <SearchInput />
      <Button>
        <Plus />
        {t('创建')}
      </Button>
    </div>
  )
}
