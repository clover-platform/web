import { Action } from "../../../../common/action";
import { Dropdown, DropdownMenuItemProps, useAlert, useMessage } from "@atom-ui/core";
import classNames from 'classnames';
import { logout } from "@clover/public/rest/auth";
import { UNAUTHORIZED } from "@clover/public/events/auth";
import bus from '@easy-kit/common/events';

const menus: DropdownMenuItemProps[] = [
    {
        id: 'profile',
        label: '{#个人资料#}',
        type: 'item',
    },
    {
        id: 'separator.1',
        type: 'separator',
    },
    {
        id: 'exit',
        label: '{#退出#}',
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
                    title: '{#确认#}',
                    description: '{#是否要退出当前账号？#}',
                    okText: '{#退出#}',
                    onOk: async () => {
                        const { success, message } = await logout();
                        if(success) {
                            bus.emit(UNAUTHORIZED);
                        }else{
                            msg.error(message);
                        }
                        return success;
                    }
                })
            }
        }}
        items={menus}
        align={"end"}
        asChild
    >
        <Action type={"light"}>
            <div
                className={classNames(
                    "w-6 h-6 rounded-full bg-[url(~@clover/public/assets/image/default/avatar.png)] bg-contain bg-center",
                )}
            />
        </Action>
    </Dropdown>
}
