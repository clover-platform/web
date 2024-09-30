import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {catalog} from "@/rest/page";
import {useRouter, useSearchParams} from "next/navigation";
import {Catalog} from "@/types/pages/book";
import {AddPageAction} from "@/components/layout/book/page-actions/add";
import {TreeData, Tree} from "@/components/common/tree";
import {MorePageAction} from "@/components/layout/book/page-actions/more";
import classNames from "classnames";

type MenuTitleProps = {
    title: string;
    id: number;
}

const MenuTitle: FC<MenuTitleProps> = (props) => {
    const {title, id} = props;
    const [moreOpen, setMoreOpen] = useState(false);
    return <div className={"flex justify-start items-center pr-1 group w-full"}>
        <div className={"flex-1 w-0 flex-shrink-0 truncate"}>{title}</div>
        <div className={classNames(
            "hidden group-hover:flex space-x-1",
            moreOpen ? "!flex" : ""
        )}>
            <AddPageAction parent={id} className={"w-6 h-6 !p-0"}/>
            <MorePageAction onOpenChange={setMoreOpen} id={id} className={"w-6 h-6 !p-0"}/>
        </div>
    </div>
}

const toTreeItemProps = (data: Catalog[]): TreeData[] => {
    return data.map(item => {
        return {
            key: `${item.id}`,
            title: <MenuTitle title={item.title} id={item.id} />,
            children: toTreeItemProps(item.children)
        }
    });
}

export const CatalogTree = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [data, setData] = useState<Catalog[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const router = useRouter();

    const load = useCallback(async () => {
        const { success, data } = await catalog({
            bookId: Number(id)
        });
        if(success) {
            setData(data!);
        }else{
            setData([]);
        }
    }, []);

    useEffect(() => {
        load().then();
    }, [load]);

    const treeData = useMemo<TreeData[]>(() => {
        return toTreeItemProps(data);
    }, [data])

    return <div className={"mx-2"}>
        <Tree
            prefixCls={"rc-tree"}
            treeData={treeData}
            draggable={true}
            selectable={true}
            onDrop={(info) => {
                const { dropToGap, node, dragNode, dropPosition } = info;
                const { key: dragKey } = dragNode;
                const { key } = node;
                console.log(dropPosition, dropToGap, key, dragKey);
            }}
            selectedKeys={selectedKeys}
            onSelect={(selectedKeys, {selected}) => {
                if(selected) {
                    setSelectedKeys(selectedKeys as string[]);
                    router.push(`book/page/?id=${id}&page=${selectedKeys[0]}`);
                }
            }}
        />
    </div>
}
