import { Input } from '@easykit/design'
import type { ChangeEvent, ComponentProps, FC } from 'react'

export const CodeInput: FC<ComponentProps<typeof Input>> = (props) => {
  const { onChange, ...rest } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value
    v = v ? v.replace(/[^\d]/g, '') : v
    e.target.value = v
    onChange?.(e)
  }

  return <Input {...rest} onChange={handleChange} maxLength={6} />
}
