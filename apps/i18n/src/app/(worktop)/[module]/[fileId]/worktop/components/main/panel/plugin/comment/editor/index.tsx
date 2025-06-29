import { ENTRY_COMMENT_RELOAD } from '@/events/worktop'
import { add } from '@/rest/entry.comment'
import { currentEntryState, currentLanguageState, entriesState, filesState } from '@/state/worktop'
import { IconSend } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import bus from '@clover/public/events'
import { Spin, useMessage } from '@easykit/design'
import { useMutation } from '@tanstack/react-query'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import TextareaAutosize from 'react-textarea-autosize'

export const CommentEditor = () => {
  const [value, setValue] = useState<string>('')
  const msg = useMessage()
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const [language] = useAtom(currentLanguageState)
  const { module } = useParams()
  const [files] = useAtom(filesState)
  const file = files.find((b) => b.id === entry.fileId)
  const { t } = useTranslation()
  const { mutateAsync: addMutate, isPending: loading } = useMutation({
    mutationFn: add,
    onSuccess: () => {
      setValue('')
      bus.emit(ENTRY_COMMENT_RELOAD)
    },
    onError: (error) => {
      msg.error(error.message)
    },
  })

  const send = async () => {
    if (!value) {
      msg.error(t('请输入评论内容'))
      return
    }
    await addMutate({
      content: value,
      entryId: entry.id,
      language,
      module: module as string,
      fileId: file?.id,
    })
  }

  return (
    <div className="relative w-full border-t">
      <TextareaAutosize
        minRows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t('请输入评论内容')}
        className="w-full resize-none rounded-none border-none px-4 py-2 shadow-none focus:outline-none focus-visible:ring-0"
      />
      <div className="flex items-center justify-end p-2">
        <Action disabled={loading} onClick={send}>
          <IconSend className="text-lg" />
        </Action>
      </div>
      {loading ? (
        <div
          className={classNames(
            'absolute top-0 right-0 bottom-0 left-0 bg-white/50',
            'flex items-center justify-center'
          )}
        >
          <Spin />
        </div>
      ) : null}
    </div>
  )
}
