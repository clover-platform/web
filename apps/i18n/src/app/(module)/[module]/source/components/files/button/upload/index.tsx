import { Button } from '@easykit/design'
import { FileUp } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UploadDialog } from '../../dialog/upload'

export const UploadButton = () => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button variant="outline" onClick={() => setVisible(true)}>
        <FileUp />
        {t('上传文件')}
      </Button>
      <UploadDialog
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </>
  )
}
