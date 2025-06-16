import { Dialog, type DialogProps } from '@easykit/design'
import { type FC, type ReactElement, cloneElement } from 'react'

export type FormatConfigModalProps = {
  content: ReactElement
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onConfirm: (data: any) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  configDefault?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  config?: any
} & DialogProps

export const FormatConfigModal: FC<FormatConfigModalProps> = (props) => {
  return (
    <Dialog {...props} maskClosable={false}>
      {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
      {cloneElement<any>(props.content, {
        onCancel: props.onCancel,
        onConfirm: props.onConfirm,
        defaultValues: props.config || props.configDefault,
      })}
    </Dialog>
  )
}
