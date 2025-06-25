import { currentEntryState, entriesState, filesState } from '@/state/worktop'
import { useAtom } from 'jotai/index'
import { useMemo } from "react";

export const useCurrentFile = () => {
  const [entries] = useAtom(entriesState)
  const [current] = useAtom(currentEntryState)
  const entry = entries[current]
  const [files] = useAtom(filesState)
  return useMemo(() => files.find((i) => i.id === entry.fileId), [files, entry])
}
