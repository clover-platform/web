import { type FC, useRef, useState } from 'react'
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@easykit/design'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'
import { useDocumentClick } from '@clover/public/hooks'
import { t } from '@clover/public/utils/locale.client'

export type RoleSelectProps = {
  value?: string[]
  onChange?: (value: string[]) => void
}

type RoleOption = {
  label: string
  value: string
  description: string
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    label: t('管理员'),
    value: '1',
    description: t('对整个项目拥有无限的控制权'),
  },
  {
    label: t('翻译者'),
    value: '3',
    description: t('可以翻译内容并对现有翻译进行投票'),
  },
  {
    label: t('校对人'),
    value: '4',
    description: t('可以翻译和校对内容'),
  },
]

export const RoleSelect: FC<RoleSelectProps> = (props) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  // biome-ignore lint/suspicious/noExplicitAny: contentRef
  const contentRef = useRef<any>(null)
  // biome-ignore lint/suspicious/noExplicitAny: buttonRef
  const buttonRef = useRef<any>(null)
  const [selected, setSelected] = useState<string[]>(props.value || [])
  useDocumentClick([buttonRef, contentRef], () => {
    setOpen(false)
  })

  const onCheckedChange = (value: string, checked: boolean) => {
    let newSelected = [...selected]
    if (checked) {
      newSelected = [...selected, value]
    } else {
      newSelected = selected.filter((item) => item !== value)
    }
    setSelected(newSelected)
    props.onChange?.(newSelected)
  }

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button onClick={() => setOpen(true)} ref={buttonRef} variant="outline">
          {selected.length > 0 ? (
            <div className="flex w-full items-center justify-start">
              <div className="flex flex-1 items-center justify-start gap-2">
                {selected.map((item) => {
                  const option = ROLE_OPTIONS.find((option) => option.value === item)
                  return <span key={item}>{option?.label}</span>
                })}
              </div>
              <ChevronDownIcon className="ml-1" />
            </div>
          ) : (
            <div className="flex w-full items-center justify-start text-muted-foreground">
              <span className="flex flex-1 items-center justify-start">{t('请选择')}</span>
              <ChevronDownIcon className="ml-1" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-96" ref={contentRef}>
        <DropdownMenuLabel>{t('请选择角色')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {ROLE_OPTIONS.map((option) => {
          const checked = selected.includes(option.value)
          return (
            <DropdownMenuItem key={option.value} onClick={() => onCheckedChange(option.value, !checked)}>
              <div className="flex items-start justify-start">
                <div className="mr-1 p-0.5">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(checked: boolean) => onCheckedChange(option.value, checked)}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span>{option.label}</span>
                  <span className="text-muted-foreground text-xs">{option.description}</span>
                </div>
              </div>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
