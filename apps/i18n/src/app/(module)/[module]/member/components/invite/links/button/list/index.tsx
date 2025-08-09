import { InviteLinkListModal } from '../../modal/list'

import { useState } from 'react'
import { Button } from '@easykit/design'
import { useTranslation } from 'react-i18next'
export const InviteLinkListButton = () => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  return (
    <>
      <Button onClick={() => setVisible(true)} type="button" variant="link">
        {t('管理链接')}
      </Button>
      <InviteLinkListModal onCancel={() => setVisible(false)} visible={visible} />
    </>
  )
}
