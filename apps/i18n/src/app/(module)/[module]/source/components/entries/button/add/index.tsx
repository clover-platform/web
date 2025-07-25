import { Button } from '@easykit/design'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AddEntryDialog } from '../../dialog/add'

export const AddButton = () => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Plus />
        {t('添加')}
      </Button>
      <AddEntryDialog visible={open} onCancel={() => setOpen(false)} />
    </>
  )
}
