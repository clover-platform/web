import {Button} from "@easykit/design";
import {FC, PropsWithChildren} from "react";
import { useRouter } from "next/navigation";
import { t } from '@easykit/common/utils/locale';

export interface BackButtonProps extends PropsWithChildren{
    text?: string;
}

const BackButton: FC<BackButtonProps> = (props) => {
    const {
        text = t("返回"),
    } = props;

    const router = useRouter();
    return <Button
        {...props}
        variant={"outline"}
        type={"button"}
        onClick={() => router.back()}
    >
        {text}
    </Button>;
}

export default BackButton;
