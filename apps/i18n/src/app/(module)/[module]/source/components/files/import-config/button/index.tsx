import { Button } from '@easykit/design'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImportConfigDialog } from '../dialog'

export type ImportConfigButtonProps = {
  fileId: number
}

export const ImportConfigButton: FC<ImportConfigButtonProps> = (props) => {
  const { fileId } = props
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setOpen(true)
        }}
      >
        {t('导入配置')}
      </Button>
      <ImportConfigDialog fileId={fileId} visible={open} onCancel={() => setOpen(false)} />
    </>
  )
}