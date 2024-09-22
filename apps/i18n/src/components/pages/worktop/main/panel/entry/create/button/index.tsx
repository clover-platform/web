import { PlusIcon } from "@radix-ui/react-icons";
import { Action } from "@clover/public/components/common/action";
import { CreateEntryModal } from "@/components/pages/worktop/main/panel/entry/create/modal";
import { useState } from "react";
import bus from '@easy-kit/common/events';
import {ENTRY_RELOAD} from "@/events/worktop";

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
                    setVisible(false);
                }
                bus.emit(ENTRY_RELOAD);
            }}
        />
    </>
}
