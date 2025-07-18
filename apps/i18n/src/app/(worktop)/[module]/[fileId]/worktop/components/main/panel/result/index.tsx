import { ENTRY_RESULT_EDITOR_RESET } from '@/events/worktop'
import { currentEntryState } from '@/state/worktop'
import bus from '@clover/public/events'
import { Separator } from '@easykit/design'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { EntryCheck } from '../../check/entry'
import { Detail } from './detail'
import { Editor } from './editor'
import { ResultList } from './list'

export const ResultPanel = () => {
  const [editorKey, setEditorKey] = useState(Date.now())

  useEffect(() => {
    const handler = () => {
      setEditorKey(Date.now())
    }
    bus.on(ENTRY_RESULT_EDITOR_RESET, handler)
    return () => {
      bus.off(ENTRY_RESULT_EDITOR_RESET, handler)
    }
  }, [])

  const [current] = useAtom(currentEntryState)

  return (
    <EntryCheck>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Detail key={`detail-${current}`} />
        <Separator />
        <Editor key={`editor-${editorKey}-${current}`} />
        <Separator />
        <ResultList key={`list-${current}`} />
      </div>
    </EntryCheck>
  )
}
