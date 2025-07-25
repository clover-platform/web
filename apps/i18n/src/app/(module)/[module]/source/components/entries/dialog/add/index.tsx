import { Dialog, type DialogProps } from '@easykit/design'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

export type AddEntryDialogProps = DialogProps

export const AddEntryDialog: FC<AddEntryDialogProps> = (props) => {
  const { t } = useTranslation()
  return (
    <Dialog {...props} title={t('添加词条')} className="w-10/12 sm:max-w-7xl">
      test
    </Dialog>
  )
}
