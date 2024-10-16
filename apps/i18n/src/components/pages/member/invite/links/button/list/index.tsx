import { Button } from "@easykit/design";
import { InviteLinkListModal } from "@/components/pages/member/invite/links/modal/list";
import { useState } from "react";
import { t } from '@easykit/common/utils/locale';

export const InviteLinkListButton = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button
            onClick={() => setVisible(true)}
            type={"button"} variant={"link"}
        >
            {t("管理链接")}
        </Button>
        <InviteLinkListModal
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}
