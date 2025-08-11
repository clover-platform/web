import { FilesSelect } from '../index'

import { type FC, useEffect, useState } from 'react'

export type FilesSelectFilterProps = {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export const FilesSelectFilter: FC<FilesSelectFilterProps> = (props) => {
  const { value, onChange, className } = props
  const [v, setV] = useState<string[]>(value ? value.split(',') : [])

  useEffect(() => {
    setV(value ? value.split(',') : [])
  }, [value])

  return (
    <FilesSelect
      className={className}
      onChange={(v) => {
        const val = v as string[]
        setV(val)
        onChange?.(val.join(','))
      }}
      value={v}
    />
  )
}
