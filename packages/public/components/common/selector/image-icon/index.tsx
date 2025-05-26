import { ImageCropper } from '@clover/public/components/common/cropper'
import {Popover, PopoverContent, PopoverTrigger} from "@easykit/design";
import classNames from 'classnames'
import { cloneDeep } from "es-toolkit";
import { type FC, type HTMLAttributes, type PropsWithChildren, useEffect, useMemo, useState } from 'react'

export type ImageIconSelectorProps = {
  options?: string[];
  value?: string;
  onChange?: (value?: string) => void;
}

type ImageIconItemProps = PropsWithChildren<HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
}>

const ImageIconItem: FC<ImageIconItemProps> = (props) => {
  const {active} = props;
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        'm-1 h-9 w-9 cursor-pointer overflow-hidden rounded-sm',
        active ? 'outline outline-primary outline-offset-1' : ''
      )}
    >
      {props.children}
    </div>
  )
}

export const ImageIconSelector: FC<ImageIconSelectorProps> = (props) => {
  const { options, onChange } = props
  const [value, setValue] = useState<string | undefined>(props.value)
  const [files, setFiles] = useState<string[]>(options?.includes(props.value as string) ? [] : [props.value as string])
  const [file, setFile] = useState<string | undefined>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const allFiles = useMemo(() => {
    return [...(options || []), ...files]
  }, [options, files])

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger>
        <div className="h-9 w-9 overflow-hidden rounded-sm border bg-secondary">
          {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
          {value ? <img className="h-full w-full bg-cover" src={value} alt={value} /> : null}
        </div>
      </PopoverTrigger>
      <PopoverContent autoFocus={false} align="start" className="-m-1 m-1 flex flex-wrap">
        {allFiles?.map((option) => {
          return (
            <ImageIconItem
              key={option}
              active={value === option}
              onClick={() => {
                setValue(option)
                onChange?.(option)
                setOpen(false)
              }}
            >
              {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
              <img className="h-full w-full bg-cover" src={option} alt={option} />
            </ImageIconItem>
          )
        })}
        <ImageIconItem>
          <ImageCropper
            value={file}
            onChange={(file) => {
              setFile(undefined)
              if (file) {
                const newFiles = cloneDeep(files)
                newFiles.push(file as string)
                setFiles(newFiles)
                onChange?.(file as string | undefined)
              } else {
                onChange?.(options?.[0])
              }
              setOpen(false)
            }}
            className="h-9 w-9"
            aspectRatio={1}
          />
        </ImageIconItem>
      </PopoverContent>
    </Popover>
  )
}
