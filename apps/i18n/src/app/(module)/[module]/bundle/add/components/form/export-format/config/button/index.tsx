import type { ExportFormatConfig } from '@/app/(module)/[module]/bundle/components/config'
import { IconSetting } from '@arco-iconbox/react-clover'
import { Action } from '@clover/public/components/common/action'
import { type FC, useState } from 'react'
import { FormatConfigModal } from '../modal'

export type FormatConfigButtonProps = {
  config: ExportFormatConfig
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onChange?: (config: any) => void
}

export const FormatConfigButton: FC<FormatConfigButtonProps> = (props) => {
  const { config } = props
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Action onClick={() => setVisible(true)}>
        <IconSetting />
      </Action>
      <FormatConfigModal
        visible={visible}
        title={config.name}
        onCancel={() => setVisible(false)}
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onConfirm={(values: any) => {
          setVisible(false)
          props.onChange?.(values)
        }}
        content={config.configComponent!}
        configDefault={config.configDefault}
        config={config.config}
      />
    </>
  )
}
