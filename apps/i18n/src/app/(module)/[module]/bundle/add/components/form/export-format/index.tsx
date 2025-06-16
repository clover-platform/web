import { RadioGroup, RadioGroupItem } from '@easykit/design'
import classNames from 'classnames'
import { type FC, useState } from 'react'
import { type ExportFormatConfig, getSupportedFormats } from '../../../../components/config'
import { FormatConfigButton } from './config/button'

export type ExportFormatValue = {
  format: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  config?: any
}

export type ExportFormatProps = {
  value?: ExportFormatValue
  onChange?: (value: ExportFormatValue) => void
}

export const ExportFormat: FC<ExportFormatProps> = (props) => {
  const { value: v } = props
  const [value, setValue] = useState<ExportFormatValue>(v!)
  const [formats, setFormats] = useState<ExportFormatConfig[]>(
    getSupportedFormats().map((f) => ({ ...f, config: f.configDefault }))
  )

  return (
    <div className="rounded-md border bg-white dark:bg-secondary">
      <RadioGroup
        value={value?.format}
        onValueChange={(v) => {
          const format = formats.find((f) => f.id === v)
          const newValue = { ...value, config: format?.config, format: v }
          setValue(newValue)
          props.onChange?.(newValue)
        }}
        className="gap-0"
      >
        {formats.map((format) => {
          return (
            // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
            <label
              key={format.id}
              className={classNames(
                'flex items-center border-b p-2',
                'border-b first:rounded-t-md last:rounded-b-md last:border-b-0',
                value?.format === format.id ? 'bg-muted' : null
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <RadioGroupItem value={format.id} />
              </div>
              <div className="flex h-8 w-10 items-center justify-center">{format.icon}</div>
              <div className="ml-2 flex-1">
                <div className="text">{format.name}</div>
                <div className="text-muted-foreground text-sm">{format.id}</div>
              </div>
              {format.configComponent ? (
                <FormatConfigButton
                  onChange={(config) => {
                    const newFormats = formats.map((f) => {
                      if (f.id === format.id) {
                        f.config = config
                      }
                      return f
                    })
                    setFormats(newFormats)
                    const newValue = { ...value, config }
                    setValue(newValue)
                    props.onChange?.(newValue)
                  }}
                  config={format}
                />
              ) : null}
            </label>
          )
        })}
      </RadioGroup>
    </div>
  )
}
