import { Command, CommandInput, CommandItem, CommandList, SheetClose } from '@easykit/design'
import { CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { currentLanguageState, languagesState } from '@/state/worktop'

export const MenuLanguageSheet = () => {
  const [languages] = useAtom(languagesState)
  const [current, setCurrent] = useAtom(currentLanguageState)
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="font-bold text-xl">{t('语言')}</div>
      <Command className="h-auto">
        <CommandInput className="h-8" placeholder={t('请输入关键词')} />
        <SheetClose>
          <CommandList className="mt-2 p-0 text-left">
            {/* biome-ignore lint/suspicious/noExplicitAny: item */}
            {languages.map((item: any) => {
              return (
                <CommandItem key={item.id} onSelect={() => setCurrent(item.code)}>
                  <div className="flex w-full items-center justify-center">
                    <span className="flex-1">{item.name}</span>
                    {item.code === current ? <CheckIcon /> : null}
                  </div>
                </CommandItem>
              )
            })}
          </CommandList>
        </SheetClose>
      </Command>
    </div>
  )
}
