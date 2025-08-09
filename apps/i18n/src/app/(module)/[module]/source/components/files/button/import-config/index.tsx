import { ImportConfigDialog } from '../../dialog/import-config'

import { type FC, useState } from 'react'
import { Button } from '@easykit/design'
import { useTranslation } from 'react-i18next'

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
        onClick={() => {
          setOpen(true)
        }}
        size="sm"
        variant="outline"
      >
        {t('导入配置')}
      </Button>
      <ImportConfigDialog fileId={fileId} onCancel={() => setOpen(false)} visible={open} />
    </>
  )
}
