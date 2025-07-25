import { type FC, useEffect, useState } from 'react'
import { FilesSelect } from '../index'

export type FilesSelectFilterProps = {
  value?: string
  onChange?: (value: string) => void
}

export const FilesSelectFilter: FC<FilesSelectFilterProps> = (props) => {
  const { value, onChange } = props
  const [v, setV] = useState<string[]>(value ? value.split(',') : [])

  useEffect(() => {
    setV(value ? value.split(',') : [])
  }, [value])

  return (
    <FilesSelect
      value={v}
      onChange={(v) => {
        const val = v as string[]
        setV(val)
        onChange?.(val.join(','))
      }}
    />
  )
}
