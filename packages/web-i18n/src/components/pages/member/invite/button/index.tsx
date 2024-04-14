import { IconAdd } from "@arco-iconbox/react-clover";
import { Button } from "@atom-ui/core";
import { useState } from "react";
import { InviteModal } from "@/components/pages/member/invite/modal";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export const InviteButton = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button onClick={() => setVisible(true)}>
            <IconAdd {...FIX_ICON_PROPS} /> {"{#邀请成员#}"}
        </Button>
        <InviteModal
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}
