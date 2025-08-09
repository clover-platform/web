import { useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import bus from '@clover/public/events'
import { useEntriesUpdater } from '@/components/layout/worktop/hooks'
import { ENTRY_RESULT_RELOAD } from '@/events/worktop'
import { useCurrentFile } from '@/hooks/use.current.file'
import { save } from '@/rest/entry.result'
import { currentEntryState, currentLanguageState, entriesState } from '@/state/worktop'

export const useResultSubmit = (): [(content: string) => void, boolean] => {
  const [entries] = useAtom(entriesState)
  const [current, setCurrent] = useAtom(currentEntryState)
  const [language] = useAtom(currentLanguageState)
  const entry = entries[current]
  const msg = useMessage()
  const { update } = useEntriesUpdater()
  const { module } = useParams()
  const file = useCurrentFile()
  const { t } = useTranslation()
  const { mutate, isPending: loading } = useMutation({
    mutationFn: save,
    onSuccess: async () => {
      bus.emit(ENTRY_RESULT_RELOAD)
      await update(entry.id)
      next()
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const next = () => {
    if (current < entries.length - 1) {
      setCurrent(current + 1)
    }
  }

  const submit = (content: string) => {
    if (!content) {
      return msg.error(t('请输入翻译结果'))
    }
    mutate({
      module: module as string,
      entryId: entry.id,
      content,
      language,
      fileId: file?.id,
    })
  }

  return [submit, loading]
}
