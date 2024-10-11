import {Button, Dialog, DialogProps, useMessage} from "@easykit/design";
import { FC, useState } from "react";
import { MemberInviteForm } from "@/components/pages/member/invite/form";
import { MemberInviteRequest } from "@/types/pages/member";
import { GetInviteLinkButton } from "@/components/pages/member/invite/links/button/get";
import { InviteLinkListButton } from "@/components/pages/member/invite/links/button/list";
import {MemberInviteData, send} from "@/rest/member.invite";
import {useSearchParams} from "next/navigation";

export type InviteModalProps = {} & DialogProps;

export const InviteModal: FC<InviteModalProps> = (props) => {
    const [invite, setInvite] = useState<MemberInviteRequest>({
        roles: ['3'],
        emails: '',
        content: '',
    });
    const search = useSearchParams();
    const id = search.get("id");
    const [loading, setLoading] = useState(false);
    const msg = useMessage();

    const onSubmit = async (data: MemberInviteData) => {
        setLoading(true);
        data.moduleId = Number(id);
        const { success, message } = await send(data);
        setLoading(false);
        if(success) {
            msg.success("{#邀请发送成功#}");
            props.onCancel?.();
        }else{
            msg.error(message)
        }
    }

    return <Dialog
        {...props}
        title={"{#邀请成员#}"}
        maskClosable={false}
    >
        <MemberInviteForm
            onSubmit={onSubmit}
            onValuesChange={setInvite}
        >
            <div className={"flex justify-center items-center"}>
                <div className={"flex-1"}>
                    <GetInviteLinkButton
                        roles={invite.roles}
                        disabled={!invite.roles.length}
                    />
                    <InviteLinkListButton />
                </div>
                <div>
                    <Button loading={loading} type={"submit"}>{"{#发送邀请#}"}</Button>
                </div>
            </div>
        </MemberInviteForm>
    </Dialog>
}
