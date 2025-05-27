import { EditEntryModal } from "@/components/pages/worktop/main/panel/entry/edit/modal";
import type { Entry } from '@/types/pages/entry'
import { Action } from '@clover/public/components/common/action'
import { Tooltip } from "@easykit/design";
import { Pencil1Icon } from '@radix-ui/react-icons'
import { type FC, useState } from 'react'
import { useTranslation } from "react-i18next";

export type EditEntryButtonProps = {
  entry: Entry;
  onSuccess?: () => void;
}

export const EditEntryButton: FC<EditEntryButtonProps> = (props) => {
  const { entry } = props;
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Tooltip content={t('编辑')}>
        <Action onClick={() => setVisible(true)}>
          <Pencil1Icon />
        </Action>
      </Tooltip>
      <EditEntryModal
        entry={entry}
        visible={visible}
        onCancel={() => setVisible(false)}
        onSuccess={() => {
          setVisible(false)
          props.onSuccess?.()
        }}
      />
    </>
  )
}
