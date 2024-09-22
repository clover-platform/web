import { Button } from "@atom-ui/core";
import { InviteLinkListModal } from "@/components/pages/member/invite/links/modal/list";
import { useState } from "react";

export const InviteLinkListButton = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button
            onClick={() => setVisible(true)}
            type={"button"} variant={"link"}
        >
            {"{#管理链接#}"}
        </Button>
        <InviteLinkListModal
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}
