import { IconAdd } from '@arco-iconbox/react-clover'
import { Button } from '@easykit/design'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NewBranchModal } from '../modal'
export type NewBranchButtonProps = {
  onSuccess?: () => void
}

export const NewBranchButton: FC<NewBranchButtonProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <Button variant="outline" onClick={() => setVisible(true)}>
        <IconAdd />
        {t('新分支')}
      </Button>
      <NewBranchModal
        onSuccess={() => {
          setVisible(false)
          props.onSuccess?.()
        }}
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </>
  )
}
