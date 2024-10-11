import { Pencil1Icon } from "@radix-ui/react-icons";
import { Action } from "@clover/public/components/common/action";
import { EditEntryModal } from "@/components/pages/worktop/main/panel/entry/edit/modal";
import { FC, useState } from "react";
import { Entry } from "@/types/pages/entry";
import { Tooltip } from "@easykit/design";

export type EditEntryButtonProps = {
    entry: Entry;
    onSuccess?: () => void;
}

export const EditEntryButton: FC<EditEntryButtonProps> = (props) => {
    const { entry } = props;
    const [visible, setVisible] = useState(false);

    return <>
        <Tooltip content={"{#编辑#}"}>
            <Action onClick={() => setVisible(true)}>
                <Pencil1Icon />
            </Action>
        </Tooltip>
        <EditEntryModal
            entry={entry}
            visible={visible}
            onCancel={() => setVisible(false)}
            onSuccess={() => {
                setVisible(false);
                props.onSuccess?.();

            }}
        />
    </>
}
