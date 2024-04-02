import { Button, Dialog, DialogProps } from "@atom-ui/core";
import { FC, useState } from "react";
import { MemberInviteForm } from "@/components/pages/member/invite/form";
import { MemberInviteRequest } from "@/types/pages/member";
import { GetInviteLinkButton } from "@/components/pages/member/invite/links/button/get";
import { InviteLinkListButton } from "@/components/pages/member/invite/links/button/list";

export type InviteModalProps = {} & DialogProps;

export const InviteModal: FC<InviteModalProps> = (props) => {
    const [invite, setInvite] = useState<MemberInviteRequest>({
        roles: ['3'],
        emails: '',
        content: '',
    });

    return <Dialog
        {...props}
        title={"{#邀请成员#}"}
        maskClosable={false}
    >
        <MemberInviteForm onValuesChange={setInvite}>
            <div className={"flex justify-center items-center"}>
                <div className={"flex-1"}>
                    <GetInviteLinkButton
                        roles={invite.roles}
                        disabled={!invite.roles.length}
                    />
                    <InviteLinkListButton />
                </div>
                <div>
                    <Button type={"submit"}>{"{#发送邀请#}"}</Button>
                </div>
            </div>
        </MemberInviteForm>
    </Dialog>
}
