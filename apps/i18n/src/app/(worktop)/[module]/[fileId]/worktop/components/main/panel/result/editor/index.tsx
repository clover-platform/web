import { useResultSubmit } from '../hooks/use.result.submit'

import { useCallback, useEffect, useState } from 'react'
import { IconClear } from '@arco-iconbox/react-clover'
import { Button, Tooltip } from '@easykit/design'
import { CopyIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import TextareaAutosize from 'react-textarea-autosize'
import { Action } from '@clover/public/components/common/action'
import bus from '@clover/public/events'
import { ENTRY_RESULT_AI_INSERT } from '@/events/worktop'
import { currentEntryState, entriesState } from '@/state/worktop'

export const Editor = () => {
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const [content, setContent] = useState(entry?.translation?.content)
  const [submit, loading] = useResultSubmit()
  const { t } = useTranslation()

  const onSave = useCallback(async () => {
    await submit(content!)
  }, [content, submit])

  useEffect(() => {
    bus.on(ENTRY_RESULT_AI_INSERT, setContent)
    return () => {
      bus.off(ENTRY_RESULT_AI_INSERT, setContent)
    }
  }, [])

  return (
    <div className="w-full">
      <TextareaAutosize
        className="w-full resize-none rounded-none border-none px-4 py-2 shadow-none focus:outline-none focus-visible:ring-0"
        minRows={3}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('请输入翻译内容')}
        value={content}
      />
      <div className="flex items-center justify-center p-2 px-4">
        <div className="flex flex-1 items-center justify-start">
          <Tooltip content={t('使用源语言填充')}>
            <Action onClick={() => setContent(entry?.value)}>
              <CopyIcon />
            </Action>
          </Tooltip>
          <Tooltip content={t('清空')}>
            <Action onClick={() => setContent('')}>
              <IconClear className="text-base" />
            </Action>
          </Tooltip>
        </div>
        <div>
          <Button loading={loading} onClick={onSave} variant="outline">
            {t('保存')}
          </Button>
        </div>
      </div>
    </div>
  )
}
