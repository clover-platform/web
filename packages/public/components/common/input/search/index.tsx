import type { ComponentProps, FC } from 'react'
import { IconSearch } from '@arco-iconbox/react-clover'
import { cn, Input } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const SearchInput: FC<ComponentProps<typeof Input>> = (props) => {
  const { t } = useTranslation()
  const { className, placeholder = t('请输入关键词'), ...rest } = props
  return (
    <div className={cn('relative w-[220px]', className)}>
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center px-3">
        <IconSearch />
      </div>
      <Input {...rest} className="pl-8" placeholder={placeholder} />
    </div>
  )
}
