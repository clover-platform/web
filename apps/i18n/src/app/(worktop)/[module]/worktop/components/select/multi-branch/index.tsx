import { filesState } from '@/state/worktop'
import { IconBranch } from '@arco-iconbox/react-clover'
import { Checkbox, ScrollArea } from '@easykit/design'
import { useAtom } from 'jotai'
import { type FC, useState } from 'react'

export type MultiBranchSelectProps = {
  value?: string[]
  onChange?: (value: string[]) => void
}

export const MultiBranchSelect: FC<MultiBranchSelectProps> = (props) => {
  const [files] = useAtom(filesState)
  const [selectId] = useState(Date.now())
  const [selected, setSelected] = useState(props.value || [])

  return (
    <ScrollArea className="h-32 rounded-md bg-muted">
      {files.map((file) => {
        const id = `${selectId}-${file.id}`
        return (
          <div key={file.id} className="flex items-center space-x-1 px-2 py-1">
            <div className="flex h-6 w-6 items-center justify-center">
              <Checkbox
                checked={selected.includes(file.name)}
                onCheckedChange={(checked) => {
                  const newSelected = checked ? [...selected, file.name] : selected.filter((item) => item !== file.name)
                  setSelected(newSelected)
                  props.onChange?.(newSelected)
                }}
                id={id}
              />
            </div>
            <label
              htmlFor={id}
              className="flex h-6 flex-1 items-center justify-start font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <IconBranch /> {file.name}
            </label>
          </div>
        )
      })}
    </ScrollArea>
  )
}
