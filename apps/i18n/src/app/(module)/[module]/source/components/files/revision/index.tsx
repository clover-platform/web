import classNames from 'classnames'
import type { FC } from 'react'

export type FileRevisionProps = {
  version: number
  fileId: number
}

export const FileRevision: FC<FileRevisionProps> = (props) => {
  const { version, fileId } = props
  return (
    <div
      className={classNames(
        'cursor-pointer rounded-full border border-secondary bg-secondary px-2 py-1 text-center text-primary-foreground text-xs',
        'hover:border-primary'
      )}
    >
      {version}
    </div>
  )
}