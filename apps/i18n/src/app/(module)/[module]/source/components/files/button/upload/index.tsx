import { UploadDialog } from '../../dialog/upload'

import { useState } from 'react'
import { Button } from '@easykit/design'
import { FileUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const UploadButton = () => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button onClick={() => setVisible(true)} variant="outline">
        <FileUp />
        {t('上传文件')}
      </Button>
      <UploadDialog onCancel={() => setVisible(false)} visible={visible} />
    </>
  )
}
