import type { File } from '@/types/module/source'
import { IconEXCEL, IconJSON } from '@arco-iconbox/react-clover'
import classNames from 'classnames'
import { type FC, useMemo } from 'react'

export type FileNameProps = {
  file: File
}

export const FileName: FC<FileNameProps> = (props) => {
  const { file } = props
  const { importStatus } = file

  const icon = useMemo(() => {
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      return <IconEXCEL className="size-6" />
    }
    if (file.name.endsWith('.json')) {
      return <IconJSON className="size-6" />
    }
    return null
  }, [file.name])

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span
        className={classNames({
          'text-error-foreground': importStatus === 0,
        })}
      >
        {file.name}
      </span>
    </div>
  )
}