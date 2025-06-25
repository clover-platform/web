import { currentEntryState, currentFileState, currentLanguageState, filesState } from '@/state/worktop'
import { Command, CommandInput, CommandItem, CommandList, SheetClose } from '@easykit/design'
import { CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const MenuFileSheet = () => {
  const [files] = useAtom(filesState)
  const [current] = useAtom(currentFileState)
  const [, setCurrentEntry] = useAtom(currentEntryState)
  const [currentLanguage] = useAtom(currentLanguageState)
  const { t } = useTranslation()
  const { module } = useParams()
  const router = useRouter()

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
                router.push(`/${module}/all/worktop?target=${currentLanguage}`)
              }}
            >
              <div className="flex w-full items-center justify-center">
                <span className="flex-1">{t('所有文件')}</span>
                {current === 'all' ? <CheckIcon /> : null}
              </div>
            </CommandItem>
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {files.map((item: any) => {
              return (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setCurrentEntry(0)
                    router.push(`/${module}/${item.id}/worktop?target=${currentLanguage}`)
                  }}
                >
                  <div className="flex w-full items-center justify-center">
                    <span className="flex-1">{item.name}</span>
                    {item.id === Number(current) ? <CheckIcon /> : null}
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
