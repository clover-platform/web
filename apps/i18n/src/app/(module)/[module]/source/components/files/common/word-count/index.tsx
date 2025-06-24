import { type FC, useMemo } from 'react'
import { ImportConfigButton } from '../../button/import-config'

export type WordCountProps = {
  wordCount: number
  fileId: number
  revisionVersion: number
  importStatus: number
}

export const WordCount: FC<WordCountProps> = (props) => {
  const { wordCount, fileId, revisionVersion, importStatus } = props

  const content = useMemo(() => {
    if (importStatus === 0) {
      return <ImportConfigButton fileId={fileId} />
    }
    if (revisionVersion === 0) {
      return 0
    }
    return wordCount ?? 0
  }, [wordCount, revisionVersion, fileId, importStatus])

  return <div className="text-right">{content}</div>
}