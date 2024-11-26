import { MemberInvite } from "@/types/pages/member";
import { FC } from "react";
import { Tooltip, useAlert, useMessage, ValueFormatter } from "@easykit/design";
import { MemberRole } from "@/components/pages/member/role";
import { CopyIcon } from "@radix-ui/react-icons";
import { Action } from "@clover/public/components/common/action";
import { IconDelete } from "@arco-iconbox/react-clover";
import copy from 'copy-to-clipboard';
import { revoke } from "@/rest/member.invite";
import {useSearchParams} from "next/navigation";
import { t } from '@easykit/common/utils/locale';
import {useModule} from "@/hooks/use.module";

export type InviteLinkItemProps = {
    item: MemberInvite;
    onRevoke?: () => void;
}

export const InviteLinkItem: FC<InviteLinkItemProps> = (props) => {
    const { item } = props;
    const m = useModule();
    const url = `${window.location.origin}/i18n/invite/?t=${item.token}`;
    const msg = useMessage();
    const alert = useAlert();

    const doRevoke = () => {
        alert.confirm({
            title: t("确认撤销"),
            description: t("撤销后，该邀请链接将失效，是否继续？"),
            onOk: async () => {
                const { success, message } = await revoke({
                    module: m,
                    id: item.id
                });
                if(success) {
                    msg.success(t("撤销成功"));
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
                <Tooltip content={t("复制")}>
                    <Action
                        onClick={() => {
                            copy(url);
                            msg.success(t("复制成功"));
                        }}
                        className={"w-8 h-8 !p-0"}
                    >
                        <CopyIcon />
                    </Action>
                </Tooltip>
            </div>
            <div className={"p-1 border-l"}>
                <Tooltip content={t("撤销")}>
                    <Action
                        onClick={doRevoke}
                        className={"w-8 h-8 !p-0"}
                    >
                        <IconDelete />
                    </Action>
                </Tooltip>
            </div>
        </div>
        <div className={"space-x-2"}>
            { item.roles.map((role) => <MemberRole key={role} value={Number(role)}/>) }
        </div>
    </div>
}
