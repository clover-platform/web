import { Button, useMessage } from "@atom-ui/core";
import { FC, useState } from "react";
import { generate } from "@/rest/member.invite";
import { useSearchParams } from "next/navigation";
import copy from 'copy-to-clipboard';

export type GetInviteLinkButtonProps = {
    disabled: boolean;
    roles: string[];
};

export const GetInviteLinkButton: FC<GetInviteLinkButtonProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const search = useSearchParams();
    const id = search.get("id");
    const msg = useMessage();

    const doGenerate = async () => {
        setLoading(true);
        const { success, message, data } = await generate({
            moduleId: Number(id),
            roles: props.roles
        });
        setLoading(false);
        if(success) {
            const url = `${window.location.origin}/i18n/invite/?t=${data}`;
            copy(url);
            msg.success("{#邀请链接已复制#}");
        }else{
            msg.error(message);
        }
    }

    return <Button
        disabled={props.disabled}
        loading={loading}
        type={"button"} variant={"outline"}
        onClick={doGenerate}
    >
        {"{#获取链接#}"}
    </Button>
}