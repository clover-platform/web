import {PropsWithChildren, FC} from "react";
import MainLayout from "../main";
import {Tabs, TabsList, TabsTrigger} from "@atom-ui/core";
import {TABS} from "@/config/layout/access";
import {useLayoutTitle} from "@clover/common/components/layout/admin/hooks";
import {useRouter} from "next/navigation";

export interface AccessLayoutProps extends PropsWithChildren {
    active?: string;
}

export interface TabItem {
    value: string;
    label: string;
    url: string;
}

const AccessLayout: FC<AccessLayoutProps> = (props) => {
    useLayoutTitle("{#权限管理#}");
    const router = useRouter();

    const onTabClick = (v: TabItem) => {
        router.push(v.url);
    }
    return <MainLayout
        active={"access"}
    >
        <Tabs className={"my-2"} value={props.active}>
            <TabsList>
                { TABS.map((tab) => <TabsTrigger onClick={() => onTabClick(tab)} key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>) }
            </TabsList>
        </Tabs>
        { props.children }
    </MainLayout>
};

export default AccessLayout;
