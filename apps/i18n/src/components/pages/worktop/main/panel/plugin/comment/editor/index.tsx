import { ENTRY_COMMENT_RELOAD } from '@/events/worktop'
import { add } from '@/rest/entry.comment'
import { branchesState, currentEntryState, currentLanguageState, entriesState } from '@/state/worktop'
import { IconSend } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { MentionsEditor } from '@clover/public/components/common/editor/mentions'
import bus from '@clover/public/events'
import { Spin, useMessage } from '@easykit/design'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const CommentEditor = () => {
  const [value, setValue] = useState<string>('')
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const editorRef = useRef<any>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const msg = useMessage()
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const [language] = useAtom(currentLanguageState)
  const { module } = useParams()
  const [branches] = useAtom(branchesState)
  const branch = branches.find((b) => b.id === entry.branchId)
  const { t } = useTranslation()

  const send = async () => {
    if (!value) {
      msg.error(t('请输入评论内容'))
      return
    }
    setLoading(true)
    const { success, message } = await add({
      content: value,
      entryId: entry.id,
      language,
      module: module as string,
      branch: branch?.name || '',
    })
    if (success) {
      setValue('')
      editorRef.current.reset()
      bus.emit(ENTRY_COMMENT_RELOAD)
    } else {
      msg.error(message)
    }
    setLoading(false)
  }

  return (
    <div className="relative w-full border-t">
      <MentionsEditor ref={editorRef} value={value} onChange={setValue} />
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
