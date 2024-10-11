import { Button } from "@easykit/design";
import { FC, useState } from "react";
import { NewBranchModal } from "@/components/pages/branch/new/modal";

export type NewBranchButtonProps = {
    onSuccess?: () => void;
}

export const NewBranchButton: FC<NewBranchButtonProps> = (props) => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button onClick={() => setVisible(true)}>{"{#新分支#}"}</Button>
        <NewBranchModal
            onSuccess={() => {
                setVisible(false);
                props.onSuccess?.();
            }}
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}
