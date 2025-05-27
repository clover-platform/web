import { IconShare } from '@arco-iconbox/react-clover'
import { Command, CommandItem, CommandList } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const MenuHelpSheet = () => {
  const { t } = useTranslation()
  return (
    <div className="space-y-2">
      <div className="font-bold text-xl">{t('帮助')}</div>
      <Command className="h-auto">
        <CommandList className="p-0">
          <CommandItem>
            <div className="flex w-full items-center justify-center">
              <span className="flex-1">{t('快速上手')}</span>
              <IconShare />
            </div>
          </CommandItem>
          <CommandItem>
            <div className="flex w-full items-center justify-center">
              <span className="flex-1">{t('设置')}</span>
            </div>
          </CommandItem>
        </CommandList>
      </Command>
    </div>
  )
}
