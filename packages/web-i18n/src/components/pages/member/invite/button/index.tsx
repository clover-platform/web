import { IconAdd } from "@arco-iconbox/react-clover";
import { Button } from "@atom-ui/core";
import { useState } from "react";
import { InviteModal } from "@/components/pages/member/invite/modal";

export const InviteButton = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button onClick={() => setVisible(true)}>
            <IconAdd /> {"{#邀请成员#}"}
        </Button>
        <InviteModal
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}