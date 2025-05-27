import { NewBranchModal } from "@/components/pages/branch/new/modal";
import { Button } from '@easykit/design'
import { type FC, useState } from 'react'
import { useTranslation } from "react-i18next";
export type NewBranchButtonProps = {
  onSuccess?: () => void;
}

export const NewBranchButton: FC<NewBranchButtonProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Button onClick={() => setVisible(true)}>{t('新分支')}</Button>
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
