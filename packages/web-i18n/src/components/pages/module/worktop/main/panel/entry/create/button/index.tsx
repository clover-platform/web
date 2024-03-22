import { PlusIcon } from "@radix-ui/react-icons";
import { Action } from "@clover/public/components/common/action";
import { CreateEntryModal } from "@/components/pages/module/worktop/main/panel/entry/create/modal";
import { useState } from "react";

export const CreateEntryButton = () => {
    const [visible, setVisible] = useState(false);

    return <>
        <Action onClick={() => setVisible(true)}>
            <PlusIcon />
        </Action>
        <CreateEntryModal
            visible={visible}
            onCancel={() => setVisible(false)}
            onSuccess={(close) => {
                if(close) {
                    setVisible(true);
                }
            }}
        />
    </>
}
