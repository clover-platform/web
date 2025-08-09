import { Action, Button, Dropdown, type DropdownMenuItemProps } from '@easykit/design'
import { EllipsisVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const useActionItems = (): DropdownMenuItemProps[] => {
  return [
    {
      id: 'follow',
      label: '关注',
      type: 'item',
    },
  ]
}

export const ProfileAction = () => {
  const { t } = useTranslation()
  const items = useActionItems()

  return (
    <div className="flex flex-row gap-2">
      <Button variant="outline">{t('编辑资料')}</Button>
      <Dropdown align="end" asChild items={items}>
        <Action>
          <EllipsisVertical className="size-4" />
        </Action>
      </Dropdown>
    </div>
  )
}
