import {Button} from "@atom-ui/core";
import {FC, PropsWithChildren} from "react";
import { useRouter } from "next/navigation";

export interface BackButtonProps extends PropsWithChildren{
    text?: string;
}

const BackButton: FC<BackButtonProps> = (props) => {
    const {
        text = "{#返回#}",
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
