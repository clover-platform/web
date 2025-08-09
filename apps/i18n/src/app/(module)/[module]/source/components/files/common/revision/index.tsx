import { RevisionDialog } from '../../dialog/revision'

import { type FC, useState } from 'react'
import classNames from 'classnames'

export type FileRevisionProps = {
  version: number
  fileId: number
}

export const FileRevision: FC<FileRevisionProps> = (props) => {
  const { version, fileId } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div
        className={classNames(
          'cursor-pointer rounded-full border border-secondary bg-secondary px-2 py-1 text-center text-xs',
          'hover:border-primary'
        )}
        onClick={() => setVisible(true)}
      >
        {version}
      </div>
      <RevisionDialog fileId={fileId} onCancel={() => setVisible(false)} visible={visible} />
    </>
  )
}
