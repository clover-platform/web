'use client';

import {useLayoutConfig} from "@clover/public/components/layout/hooks/use.layout.config";
import {MainLayoutProps} from "@/components/layout/main";
import {FC, PropsWithChildren, useState} from "react";
import {TabsTitle, TabsTitleItem} from "@clover/public/components/common/tabs-title";
import {useSearchParams} from "next/navigation";
import {HomeStart, StartItem} from "@/components/pages/home/start";
import {CreateBookModal} from "@/components/pages/home/create/modal";

export const SectionTitle: FC<PropsWithChildren> = (props) => {
    return <div className={"text-lg font-medium"}>
        { props.children }
    </div>
}

export const TABS: TabsTitleItem[] = [
    {
        id: "all",
        title: "{#全部#}",
    },
    {
        id: "create",
        title: "{#由我创建#}",
    },
    {
        id: "join",
        title: "{#我加入的#}",
    }
]

export const IndexPage = () => {
    useLayoutConfig<MainLayoutProps>({
        active: "wiki",
        path: [
            {
                title: "{#文档#}",
                type: "item",
            }
        ],
    })
    const search = useSearchParams();
    const type = search.get('type') || 'all';
    const [active, setActive] = useState(type);
    const [createVisible, setCreateVisible] = useState(false);

    const onStartClick = ({id}: StartItem) => {
        if(id === "new.book") {
            setCreateVisible(true);
        }
    }

    return <div className={"flex justify-center"}>
        <div className={"container space-y-4"}>
            <SectionTitle>{"{#开始#}"}</SectionTitle>
            <HomeStart onClick={onStartClick} />
            <SectionTitle>{"{#知识库#}"}</SectionTitle>
            <TabsTitle
                active={active}
                items={TABS}
                onChange={setActive}
            />
        </div>
        <CreateBookModal
            visible={createVisible}
            onCancel={() => setCreateVisible(false)}
        />
    </div>
}
