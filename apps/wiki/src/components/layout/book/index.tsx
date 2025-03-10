import {MainLayout as PublicMainLayout, MainLayoutProps, PathProps} from "@clover/public/components/layout/main";
import {FC, useMemo, useCallback, useState, useRef} from "react";
import {useLayoutProps} from "@clover/public/components/layout/hooks/use.layout.props";
import {IconCatalog, IconHome} from "@arco-iconbox/react-clover";
import {MenuItemProps} from "@clover/public/components/layout/main/sidebar/menu-item";
import {useParams} from "next/navigation";
import {CatalogTree, CatalogTreeRef} from "@/components/layout/book/catalog";
import {AddPageAction} from "@/components/layout/book/page-actions/add";
import {ExpandAction} from "@/components/layout/book/page-actions/expand";
import { t } from '@clover/public/locale';
import {AiChat} from "@/components/layout/book/ai-chat";

export type BookLayoutProps = {
    active?: string;
    path?: PathProps[];
    className?: string;
} & MainLayoutProps;

export const BookLayout: FC<BookLayoutProps> = (origin) => {
    const props = useLayoutProps<BookLayoutProps>(origin);
    const [expandAll, setExpandAll] = useState<boolean>(false);
    const [expandAble, setExpandAble] = useState<boolean>(false);
    const treeRef = useRef<CatalogTreeRef>(null);
    const params = useParams();
    const { bookPath } = params;

    const menus: MenuItemProps[] = useMemo(() => {
        const list: MenuItemProps[] = [
            {
                id: "home",
                title: t("首页"),
                url: `/wiki/book/${bookPath}`,
                icon: <IconHome />,
            },
            {
                id: "catalog",
                title: <div className={"flex justify-center items-center"}>
                    <div className={"flex-1"}>{t("目录")}</div>
                    <div className={"-mr-3 flex space-x-1 text-foreground"}>
                        <AddPageAction className={"w-6 h-6 !p-0"} />
                        <ExpandAction
                            className={"w-6 h-6 !p-0"}
                            all={expandAll}
                            enable={expandAble}
                            onClick={(all) => {
                                if(all) {
                                    treeRef.current?.expand();
                                }else{
                                    treeRef.current?.collapse();
                                }
                            }}
                        />
                    </div>
                </div>,
                icon: <IconCatalog />,
                activeEnable: false,
            },
        ];
        return list;
    }, [bookPath, expandAll, expandAble, treeRef]);

    const onTreeExpand = useCallback((expandedKeys: string[], allKeys: string[]) => {
        setExpandAll(expandedKeys.length === allKeys.length);
        setExpandAble(allKeys.length > 0);
    }, []);

    const extra = <CatalogTree ref={treeRef} onExpand={onTreeExpand} />

    return <PublicMainLayout
        {...props}
        sidebarProps={{
            menus: menus,
            title: t("知识库"),
            active: props.active,
            extra,
        }}
        path={[
            {
                title: t("文档"),
                type: "link",
                href: `/wiki`,
                withQuery: false,
                external: true,
            },
            ...(props.path || [])
        ]}
    >
        {props.children }
        <AiChat />
    </PublicMainLayout>
}
