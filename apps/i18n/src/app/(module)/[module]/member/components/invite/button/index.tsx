import { IconAdd } from '@arco-iconbox/react-clover'
import { Button } from '@easykit/design'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InviteModal } from '../modal'

export const InviteButton = () => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)} variant="outline">
        <IconAdd /> {t('邀请成员')}
      </Button>
      <InviteModal visible={visible} onCancel={() => setVisible(false)} />
    </>
  )
}
