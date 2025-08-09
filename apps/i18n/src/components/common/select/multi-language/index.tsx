import { type FC, type HTMLAttributes, useState } from 'react'
import { IconDelete } from '@arco-iconbox/react-clover'
import { Checkbox, type CheckboxProps, Input, ScrollArea } from '@easykit/design'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Action } from '@clover/public/components/common/action'
import { languagesState } from '@/state/public'
export type MultiLanguageSelectProps = {
  className?: string
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
}

export type OptionProps = {
  label: string
  value: string
}

// biome-ignore lint/suspicious/noExplicitAny: LangItemProps
type LangItemProps = OptionProps & Pick<CheckboxProps, any>

const LangItem: FC<LangItemProps> = (props) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: label
    <label className={classNames('flex h-8 items-center space-x-2 rounded-sm px-2', 'hover:bg-muted')}>
      <Checkbox checked={props.checked} onCheckedChange={props.onCheckedChange} />
      <span className="flex-1 p-1 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{props.label}</span>
    </label>
  )
}

type SelectedLangItemProps = HTMLAttributes<HTMLDivElement> & OptionProps

const SelectedLangItem: FC<SelectedLangItemProps> = (props) => {
  return (
    <div
      {...props}
      className={classNames(
        'flex h-8 items-center justify-start rounded-sm px-2',
        'hover:bg-[rgba(0,0,0,0.05)] hover:text-destructive hover:line-through',
        props.className
      )}
    >
      {props.label}
    </div>
  )
}

export const MultiLanguageSelect: FC<MultiLanguageSelectProps> = (props) => {
  const [selected, setSelected] = useState<string[]>(props.value || [])
  const [keyword, setKeyword] = useState<string>('')
  const [languages] = useAtom(languagesState)
  const { t } = useTranslation()

  const options = languages.map((lang) => {
    return {
      label: lang.name,
      value: lang.code,
    }
  })

  const selectedOptions = options.filter((option) => selected.includes(option.value))
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(keyword.toLowerCase()) ||
      option.value.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <div className={classNames('relative overflow-hidden', props.className)}>
      <div className="flex items-start justify-start rounded-md border">
        <div className="flex h-96 flex-1 flex-col items-start justify-start border-r">
          <div className="w-full border-b p-2">
            <Input onChange={(e) => setKeyword(e.target.value)} placeholder={t('请输入关键词')} value={keyword} />
          </div>
          <div className="h-0 w-full flex-1 flex-shrink-0">
            <ScrollArea className="h-full w-full">
              <div className="p-2">
                {filteredOptions.map((option) => {
                  return (
                    <LangItem
                      key={option.value}
                      {...option}
                      checked={selected.includes(option.value)}
                      onCheckedChange={(checked: boolean) => {
                        const newSelected = checked
                          ? [...selected, option.value]
                          : selected.filter((v) => v !== option.value)
                        setSelected(newSelected)
                        props.onChange?.(newSelected)
                      }}
                    />
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex h-96 flex-1 flex-col items-start justify-start border-r bg-muted">
          <div className="flex w-full items-center justify-center border-b p-2">
            <div className="flex-1">{t('已选')}</div>
            <Action
              className="h-9 w-9"
              onClick={() => {
                setSelected([])
                props.onChange?.([])
              }}
              theme="dark"
            >
              <IconDelete />
            </Action>
          </div>
          <div className="h-0 w-full flex-1 flex-shrink-0">
            <ScrollArea className="h-full w-full">
              <div className="p-2">
                {selectedOptions.length ? (
                  selectedOptions.map((option) => {
                    return (
                      <SelectedLangItem
                        key={option.value}
                        {...option}
                        onClick={() => {
                          const newSelected = selected.filter((v) => v !== option.value)
                          setSelected(newSelected)
                          props.onChange?.(newSelected)
                        }}
                      />
                    )
                  })
                ) : (
                  <div className="flex items-center justify-center p-6 opacity-60">
                    {props.placeholder || t('暂无选中')}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
