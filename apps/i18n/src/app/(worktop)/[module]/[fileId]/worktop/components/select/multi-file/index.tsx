import { type FC, useState } from 'react'
import { Checkbox, ScrollArea } from '@easykit/design'
import { useAtom } from 'jotai'
import { FileName } from '@/components/common/file-name'
import { filesState } from '@/state/worktop'

export type MultiFileSelectProps = {
  value?: number[]
  onChange?: (value: number[]) => void
}

export const MultiFileSelect: FC<MultiFileSelectProps> = (props) => {
  const [files] = useAtom(filesState)
  const [selectId] = useState(Date.now())
  const [selected, setSelected] = useState(props.value || [])

  return (
    <ScrollArea className="h-32 rounded-md bg-muted">
      {files.map((file) => {
        const id = `${selectId}-${file.id}`
        return (
          <div className="flex items-center space-x-1 px-2 py-1" key={file.id}>
            <div className="flex h-6 w-6 items-center justify-center">
              <Checkbox
                checked={selected.includes(file.id)}
                id={id}
                onCheckedChange={(checked) => {
                  const newSelected = checked ? [...selected, file.id] : selected.filter((item) => item !== file.id)
                  setSelected(newSelected)
                  props.onChange?.(newSelected)
                }}
              />
            </div>
            <label
              className="flex h-6 flex-1 items-center justify-start font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor={id}
            >
              <FileName file={file} iconClassName="size-4" />
            </label>
          </div>
        )
      })}
    </ScrollArea>
  )
}
