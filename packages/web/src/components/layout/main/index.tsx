import {FC, PropsWithChildren, useCallback, useEffect} from "react";
import {useLayoutState} from "@/components/layout/hooks/main";
import bus from '@clover/common/events';
import {LOGIN} from "@/events/account";
import {usePathname, useRouter} from "next/navigation";
import AdminLayout from "@clover/common/components/layout/admin";
import Logo from "@/components/common/logo";
import {FOOTER_MENUS, NAV_MENUS, PROFILE_MENUS} from "@/config/layout/main";
import {Avatar, Button, Dropdown, DropdownMenuItemProps, Space} from "@atom-ui/core";
import { Action } from "@atom-ui/core";
import { IconSetting, IconAdd } from "@arco-iconbox/react-clover";
import SearchInput from "@clover/common/components/input/search";

export interface MainLayoutProps extends PropsWithChildren {
    active?: string;
}

const LayoutActions: FC = () => {
    const onItemClick = ({id}: DropdownMenuItemProps) => {
        console.log(id);
    }

    return <Space
        itemClassName={"m-1"}
        className={"flex justify-center items-center mx-1"}
    >
        <SearchInput />
        <Button variant="outline" size="icon">
            <IconAdd fontSize={20} />
        </Button>
        <Action>
            <IconSetting fontSize={20} />
        </Action>
        <Dropdown items={PROFILE_MENUS} onItemClick={onItemClick}>
            <Action>
                <Avatar
                    className={"w-7 h-7"}
                    src={"https://avatars.githubusercontent.com/u/10261133?v=4"}
                />
            </Action>
        </Dropdown>
    </Space>
}

const MainLayout: FC<MainLayoutProps> = (props) => {
    const [loading, isLogin, account] = useLayoutState();
    const router = useRouter();
    const path = usePathname();

    const onLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(path)}`)
    }, [path]);

    useEffect(() => {
        bus.on(LOGIN, onLogin);
        return () => {
            bus.off(LOGIN, onLogin);
        }
    }, []);

    return <AdminLayout
        logo={<Logo theme={"dark"} />}
        navMenus={NAV_MENUS}
        active={props.active}
        extendMenus={FOOTER_MENUS}
        actions={<LayoutActions />}
    >
        { props.children }
    </AdminLayout>
};

export default MainLayout;
