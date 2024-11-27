import {t} from "@easykit/common/utils/locale";
import {Button} from "@easykit/design";
import {FC, useState} from "react";
import {CreateModal} from "@/components/pages/profile/access/tokens/create/modal";

export type CreateButtonProps = {
    onSuccess: () => void;
}

export const CreateButton: FC<CreateButtonProps> = (props) => {
    const [visible, setVisible] = useState(false);
    return <>
        <Button onClick={() => setVisible(true)}>{t("创建令牌")}</Button>
        <CreateModal
            onSuccess={props.onSuccess}
            visible={visible}
            onCancel={() => setVisible(false)}
        />
    </>
}
