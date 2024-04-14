import { MemberInvite } from "@/types/pages/member";
import { FC } from "react";
import { Tooltip, useAlert, useMessage, ValueFormatter } from "@atom-ui/core";
import { MemberRole } from "@/components/pages/member/role";
import { CopyIcon } from "@radix-ui/react-icons";
import { Action } from "@clover/public/components/common/action";
import { IconDelete } from "@arco-iconbox/react-clover";
import copy from 'copy-to-clipboard';
import { revoke } from "@/rest/member.invite";
import {FIX_ICON_PROPS} from "@easy-kit/common/utils/icon";

export type InviteLinkItemProps = {
    item: MemberInvite;
    onRevoke?: () => void;
}

export const InviteLinkItem: FC<InviteLinkItemProps> = (props) => {
    const { item } = props;
    const url = `${window.location.origin}/i18n/invite/?t=${item.token}`;
    const msg = useMessage();
    const alert = useAlert();

    const doRevoke = () => {
        alert.confirm({
            title: "{#确认撤销#}",
            description: "{#撤销后，该邀请链接将失效，是否继续？#}",
            onOk: async () => {
                const { success, message } = await revoke({ id: item.id });
                if(success) {
                    msg.success("{#撤销成功#}");
                    props.onRevoke?.();
                }else{
                    msg.error(message);
                }
                return success;
            }
        });
    }

    return <div className={"space-y-2"}>
        <div className={"text-muted-foreground"}>
            <ValueFormatter value={item.createTime} formatters={['time']}/>
        </div>
        <div className={"flex justify-center items-stretch border rounded-md"}>
            <div className={"flex-1 flex-shrink-0 w-0 truncate px-2 py-1 bg-muted flex items-center rounded-l-md text-muted-foreground"}>
                { url }
            </div>
            <div className={"p-1 border-l"}>
                <Tooltip content={"{#复制#}"}>
                    <Action
                        onClick={() => {
                            copy(url);
                            msg.success("{#复制成功#}");
                        }}
                        className={"w-8 h-8 !p-0"}
                    >
                        <CopyIcon />
                    </Action>
                </Tooltip>
            </div>
            <div className={"p-1 border-l"}>
                <Tooltip content={"{#撤销#}"}>
                    <Action
                        onClick={doRevoke}
                        className={"w-8 h-8 !p-0"}
                    >
                        <IconDelete {...FIX_ICON_PROPS} />
                    </Action>
                </Tooltip>
            </div>
        </div>
        <div className={"space-x-2"}>
            { item.roles.map((role) => <MemberRole key={role} value={Number(role)}/>) }
        </div>
    </div>
}
