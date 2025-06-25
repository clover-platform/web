import { currentEntryState, currentFileState, filesState } from '@/state/worktop'
import { Command, CommandInput, CommandItem, CommandList, SheetClose } from '@easykit/design'
import { CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
export const MenuBranchSheet = () => {
  const [files] = useAtom(filesState)
  const [current, setCurrent] = useAtom(currentFileState)
  const [, setCurrentEntry] = useAtom(currentEntryState)
  const { t } = useTranslation()

  return (
    <div className="space-y-2">
      <div className="font-bold text-xl">{t('分支')}</div>
      <Command className="h-auto">
        <CommandInput className="h-8" placeholder={t('请输入关键词')} />
        <SheetClose>
          <CommandList className="mt-2 p-0 text-left">
            <CommandItem
              key="all"
              onSelect={() => {
                setCurrentEntry(0)
                setCurrent('')
              }}
            >
              <div className="flex w-full items-center justify-center">
                <span className="flex-1">{t('所有分支')}</span>
                {current === '' ? <CheckIcon /> : null}
              </div>
            </CommandItem>
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {files.map((item: any) => {
              return (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setCurrentEntry(0)
                    setCurrent(item.name)
                  }}
                >
                  <div className="flex w-full items-center justify-center">
                    <span className="flex-1">{item.name}</span>
                    {item.name === current ? <CheckIcon /> : null}
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
