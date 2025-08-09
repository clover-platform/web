import { AIItem } from './item'
import { AIItemLoading } from './item/loading'

import { useCallback, useEffect, useState } from 'react'
import { ScrollArea } from '@easykit/design'
import { useAtom } from 'jotai'
import { useParams } from 'next/navigation'
import { useCurrentFile } from '@/hooks/use.current.file'
import { ai } from '@/rest/entry.result'
import { currentEntryState, currentLanguageState, entriesState } from '@/state/worktop'

const AIIListLoading = () => {
  return [0, 1, 2].map((index) => <AIItemLoading key={index} />)
}

export const AIPlugin = () => {
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const [language] = useAtom(currentLanguageState)
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<string[]>([])
  const { module } = useParams()
  const file = useCurrentFile()

  const load = useCallback(async () => {
    setLoading(true)
    const { success, data } = await ai({
      module: module as string,
      entryId: entry.id,
      language,
      fileId: file?.id,
    })
    setLoading(false)
    if (success) {
      setResults((data as string[]) || [])
    } else {
      setResults([])
    }
  }, [file?.id, entry.id, language, module])

  useEffect(() => {
    setResults([])
    load().then()
  }, [load])

  return (
    <div className="h-full w-full">
      <ScrollArea className="h-full w-full">
        <div className="space-y-2 px-3 pb-3">
          {loading ? <AIIListLoading /> : null}
          {results.map((item) => (
            <AIItem key={item} value={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
