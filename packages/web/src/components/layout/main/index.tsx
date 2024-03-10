import {FC, KeyboardEvent, PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import {useLayoutState} from "@/components/layout/hooks/main";
import bus from '@easy-kit/common/events';
import {LOGIN} from "@/events/account";
import {usePathname, useRouter} from "next/navigation";
import Logo from "@/components/common/logo";
import {FOOTER_MENUS, NAV_MENUS, PROFILE_MENUS, ADD_MENUS} from "@/config/layout/main";
import { Avatar, Button, cn, Dropdown, DropdownMenuItemProps, Space, useAlert, useMessage } from "@atom-ui/core";
import { Action } from "@atom-ui/core";
import { IconSetting, IconAdd } from "@arco-iconbox/react-clover";
import SearchInput from "@easy-kit/common/components/input/search";
import Access from "@easy-kit/common/components/access";
import {useRecoilValue} from "recoil";
import {useAccess} from "@easy-kit/common/hooks";
import {accountInfoState} from "@/state/account";
import {logout} from "@/rest/auth";
import { useInitLayoutState } from "@/components/layout/main/hooks";
import { AdminLayoutLoading } from "@/components/layout/main/loading";
import Sidebar from "@/components/layout/main/sidebar";
import "./style.css";
import {LayoutNavbar} from "@/components/layout/main/navbar";

export interface MainLayoutProps extends PropsWithChildren {
    active?: string;
}

const LayoutActions: FC = () => {
    const router = useRouter();
    const access = useAccess();
    const account = useRecoilValue<any>(accountInfoState);
    const [keyword, setKeyword] = useState('');
    const alert = useAlert();
    const msg = useMessage();

    const onItemClick = ({id}: DropdownMenuItemProps) => {
        if(id === "profile") {
            router.push(`/{#LANG#}/setting/`)
        }else if(id === "password") {
            router.push(`/{#LANG#}/setting/password/`)
        }else if(id === "logout") {
            alert.confirm({
                title: "{#退出#}",
                description: "{#请确认没有为保存的数据，是否要退出登录？#}",
                cancelText: "{#取消#}",
                okText: "{#退出#}",
                onOk: async () => {
                    const { success, message } = await logout();
                    if(success) {
                        bus.emit(LOGIN);
                    }else{
                        msg.error(message);
                    }
                    return success;
                }
            })
        }
    }

    const onAddItemClick = ({id}: DropdownMenuItemProps) => {
        router.push(`/{#LANG#}/${id}/add/`)
    }

    const onSearch = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            location.href = `/{#LANG#}/project/?name=${encodeURIComponent(keyword)}`;
            setKeyword('');
        }
    }

    const fallback = useMemo(() => {
        const { name = "" } = account || {};
        return name.substring(0, 1).toUpperCase();
    }, [account])

    return <Space className={"flex justify-center items-center mx-1"}>
        <Access value={"module:project:list"}>
            <SearchInput
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={onSearch}
            />
        </Access>
        <Dropdown asChild={true} align={"end"} className={"w-[120px]"} items={ADD_MENUS.filter(item => access(item.perm))} onItemClick={onAddItemClick}>
            <Button variant="outline" size="icon">
                <IconAdd fontSize={20} />
            </Button>
        </Dropdown>
        <Action onClick={() => router.push("/{#LANG#}/setting/")}>
            <IconSetting fontSize={20} />
        </Action>
        <Dropdown align={"end"} className={"w-[180px]"} items={PROFILE_MENUS.filter(item => access(item.perm, false))} onItemClick={onItemClick}>
            <Action>
                <Avatar
                    className={"w-7 h-7"}
                    src={account['avatar']}
                    fallback={fallback}
                />
            </Action>
        </Dropdown>
    </Space>
}

const MainLayout: FC<MainLayoutProps> = (props) => {
    const access = useAccess();
    const [loading, isLogin, account] = useLayoutState();
    const router = useRouter();
    const path = usePathname();
    const init = useInitLayoutState();

    const onLogin = useCallback(() => {
        router.push(`/{#LANG#}/login/?from=${encodeURIComponent(path)}`)
    }, [path]);

    useEffect(() => {
        bus.on(LOGIN, onLogin);
        return () => {
            bus.off(LOGIN, onLogin);
        }
    }, []);

    return (loading || !init) ? <div className={"min-h-[100vh] flex justify-center items-center"}>
        <Logo type={"light"} className={"bg-transparent animate-spin"} />
    </div> : <div className={"layout-admin flex justify-start w-full items-stretch min-h-[100vh]"}>
        <Sidebar />
        <div className={"flex-1 w-0"}>
            <LayoutNavbar />
            <div className={cn(
                "container p-0 px-2",
            )}>
                { props.children }
            </div>
        </div>
        <AdminLayoutLoading />
    </div>
};

export default MainLayout;
