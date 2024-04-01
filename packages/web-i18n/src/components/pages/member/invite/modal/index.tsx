import { Button, Dialog, DialogProps } from "@atom-ui/core";
import { FC } from "react";
import { MemberInviteForm } from "@/components/pages/member/invite/form";

export type InviteModalProps = {} & DialogProps;

export const InviteModal: FC<InviteModalProps> = (props) => {
    return <Dialog
        {...props}
        title={"{#邀请成员#}"}
        maskClosable={false}
    >
        <MemberInviteForm>
            <div className={"flex justify-center items-center"}>
                <div className={"flex-1"}>
                    <Button variant={"outline"}>{"{#获取链接#}"}</Button>
                    <Button variant={"link"}>{"{#管理链接#}"}</Button>
                </div>
                <div>
                    <Button type={"submit"}>{"{#发送邀请#}"}</Button>
                </div>
            </div>
        </MemberInviteForm>
    </Dialog>
}
