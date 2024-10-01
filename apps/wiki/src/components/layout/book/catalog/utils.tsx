import {Catalog} from "@/types/pages/book";
import {TreeData} from "@/components/common/tree";
import {FC, useState} from "react";
import classNames from "classnames";
import {AddPageAction} from "@/components/layout/book/page-actions/add";
import {MorePageAction} from "@/components/layout/book/page-actions/more";
import {useRouter, useSearchParams} from "next/navigation";

type MenuTitleProps = {
    title: string;
    id: number;
}

const MenuTitle: FC<MenuTitleProps> = (props) => {
    const {title, id} = props;
    const search = useSearchParams();
    const [moreOpen, setMoreOpen] = useState(false);
    const router = useRouter();
    const bookId = search.get("id");

    return <div
        onClick={() => router.push(`/{#LANG#}/wiki/book/page/?id=${bookId}&page=${id}`)}
        className={"flex justify-start items-center pr-1 group w-full"}
    >
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

export const toTreeItemProps = (data: Catalog[]): TreeData[] => {
    return data.map(item => {
        return {
            key: `${item.id}`,
            title: <MenuTitle title={item.title} id={item.id} />,
            children: toTreeItemProps(item.children)
        }
    });
}

export const findByKey = (data: Catalog[], key: string, rm: boolean): Catalog => {
    const target = Number(key);
    for(let i = 0; i < data.length; i++) {
        let item = data[i] as any;
        if(item.id === target) {
            rm && data.splice(i, 1);
            return item;
        }
        item = findByKey(data[i].children, key, rm);
        if(item) return item;
    }
    return null as any;
}

// 添加到与 key 相同的一级
export const addSameLevel = (data: Catalog[], item: Catalog, key: string, index: number) => {
    const target = findByKey(data, key, false);
    const { parentId } = target;
    item.parentId = parentId;
    if(parentId) {
        const parent = findByKey(data, `${parentId}`, false);
        parent.children.splice(index, 0, item);
    }else{
        data.splice(index, 0, item);
    }
}

// 移动 key 之后
export const moveToAfter = (data: Catalog[], dragKey: string, key: string, index: number): number|undefined => {
    const item = findByKey(data, dragKey, true);
    addSameLevel(data, item, key, index);
    return item.parentId;
}

export const moveToChild = (data: Catalog[], dragKey: string, key: string): number|undefined => {
    const item = findByKey(data, dragKey, true);
    const target = findByKey(data, key, false);
    if(!target.children) {
        target.children = [];
    }
    target.children.push(item);
    item.parentId = target.id;
    return item.parentId;
}
