import { InviteModal } from '../modal'

import { useState } from 'react'
import { IconAdd } from '@arco-iconbox/react-clover'
import { Button } from '@easykit/design'
import { useTranslation } from 'react-i18next'

export const InviteButton = () => {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)} variant="outline">
        <IconAdd /> {t('邀请成员')}
      </Button>
      <InviteModal onCancel={() => setVisible(false)} visible={visible} />
    </>
  )
}
