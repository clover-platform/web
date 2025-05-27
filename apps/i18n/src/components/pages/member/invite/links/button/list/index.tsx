import { InviteLinkListModal } from "@/components/pages/member/invite/links/modal/list";
import { Button } from '@easykit/design'
import { useState } from "react";
import { useTranslation } from "react-i18next";
export const InviteLinkListButton = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={() => setVisible(true)} type="button" variant="link">
        {t('管理链接')}
      </Button>
      <InviteLinkListModal visible={visible} onCancel={() => setVisible(false)} />
    </>
  )
}
