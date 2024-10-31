import { Action } from "../../../../common/action";
import { Dropdown, DropdownMenuItemProps, useAlert, useMessage } from "@easykit/design";
import classNames from 'classnames';
import { logout } from "@clover/public/rest/auth";
import { UNAUTHORIZED } from "@clover/public/events/auth";
import bus from '@easykit/common/events';
import {clearToken} from "@clover/public/utils/token";
import { t } from '@easykit/common/utils/locale';

const getMenus = (): DropdownMenuItemProps[] => [
    {
        id: 'profile',
        label: t("个人资料"),
        type: 'item',
    },
    {
        id: 'separator.1',
        type: 'separator',
    },
    {
        id: 'exit',
        label: t("退出"),
        type: 'item',
    },
]

export const SidebarProfile = () => {
    const alert = useAlert();
    const msg = useMessage();
    return <Dropdown
        onItemClick={({id}) => {
            if(id === 'exit') {
                alert.confirm({
                    title: t("确认"),
                    description: t("是否要退出当前账号？"),
                    okText: t("退出"),
                    onOk: async () => {
                        const { success, message } = await logout();
                        if(success) {
                            bus.emit(UNAUTHORIZED);
                            clearToken();
                        }else{
                            msg.error(message);
                        }
                        return success;
                    }
                })
            }
        }}
        items={getMenus()}
        align={"end"}
        asChild
    >
        <Action theme={"light"} className={"w-8 h-8 !p-0"}>
            <div
                className={classNames(
                    "w-6 h-6 rounded-full bg-[url(~@clover/public/assets/image/default/avatar.png)] bg-contain bg-center",
                )}
            />
        </Action>
    </Dropdown>
}
