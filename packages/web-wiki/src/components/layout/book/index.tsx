import {MainLayout as PublicMainLayout, MainLayoutProps, PathProps} from "@clover/public/components/layout/main";
import {FC, useMemo, useState} from "react";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {IconCatalog, IconExpand, IconHome} from "@arco-iconbox/react-clover";
import {MenuItemProps} from "@clover/public/components/layout/main/sidebar/menu-item";
import {useSearchParams} from "next/navigation";
import {Action} from "@clover/public/components/common/action";
import {CatalogTree} from "@/components/layout/book/catalog";
import {AddPageAction} from "@/components/layout/book/add-page-action";

export type BookLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & MainLayoutProps;

export const BookLayout: FC<BookLayoutProps> = (origin) => {
    const props = useLayoutProps<BookLayoutProps>(origin);
    const search = useSearchParams();
    const id = search.get("id");
    const [treeData, setTreeData] = useState<any[]>([
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
    ]);

    const menus: MenuItemProps[] = useMemo(() => {
        const list: MenuItemProps[] = [
            {
                id: "home",
                title: "{#首页#}",
                url: `/{#LANG#}/wiki/book/?id=${id}`,
                icon: <IconHome />,
            },
            {
                id: "catalog",
                title: <div className={"flex justify-center items-center"}>
                    <div className={"flex-1"}>{"{#目录#}"}</div>
                    <div className={"-mr-3 flex space-x-1"}>
                        <AddPageAction className={"w-6 h-6 !p-0"} />
                        <Action className={"w-6 h-6 !p-0"}><IconExpand/></Action>
                    </div>
                </div>,
                icon: <IconCatalog />,
                activeEnable: false,
            },
        ];
        return list;
    }, [id]);

    const extra = <CatalogTree />

    return <PublicMainLayout
        {...props}
        sidebarProps={{
            menus: menus,
            title: "{#知识库#}",
            active: props.active,
            extra,
        }}
        path={[
            {
                title: "{#文档#}",
                type: "link",
                href: "/{#LANG#}/wiki/",
                withQuery: false,
            },
            ...(props.path || [])
        ]}
    >
        {props.children }
    </PublicMainLayout>
}
