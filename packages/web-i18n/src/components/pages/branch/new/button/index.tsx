import { Button } from "@atom-ui/core";
import { FC, useState } from "react";
import { NewBranchModal } from "@/components/pages/branch/new/modal";

export type NewBranchButtonProps = {
    onSuccess?: () => void;
}

export const NewBranchButton: FC<NewBranchButtonProps> = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button onClick={() => setVisible(true)}>{"{#新分支#}"}</Button>
        <NewBranchModal
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}
