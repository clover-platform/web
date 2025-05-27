import { CreateEntryModal } from '@/components/pages/worktop/main/panel/entry/create/modal'
import { ENTRY_RELOAD } from "@/events/worktop";
import { Action } from '@clover/public/components/common/action'
import bus from '@clover/public/events'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export const CreateEntryButton = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Action onClick={() => setVisible(true)}>
        <PlusIcon />
      </Action>
      <CreateEntryModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onSuccess={(close) => {
          if (close) {
            setVisible(false)
          }
          bus.emit(ENTRY_RELOAD)
        }}
      />
    </>
  )
}
