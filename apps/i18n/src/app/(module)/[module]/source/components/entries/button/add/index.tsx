import { AddEntryDialog } from '../../dialog/add'

import { useState } from 'react'
import { Button } from '@easykit/design'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const AddButton = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline">
        <Plus />
        {t('添加')}
      </Button>
      <AddEntryDialog onCancel={() => setOpen(false)} visible={open} />
    </>
  )
}
