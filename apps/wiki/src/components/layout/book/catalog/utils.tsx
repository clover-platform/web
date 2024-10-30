import {Catalog} from "@/types/pages/book";
import {TreeData} from "@/components/common/tree";
import {FC, useState} from "react";
import classNames from "classnames";
import {AddPageAction} from "@/components/layout/book/page-actions/add";
import {MorePageAction} from "@/components/layout/book/page-actions/more";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useLocale, useLocaleCode} from "@easykit/common/hooks/use.locale";

type MenuTitleProps = {
    title: string;
    id: number;
}

export type UpdateData = {
    id: number;
    title: string;
}

const MenuTitle: FC<MenuTitleProps> = (props) => {
    const {title, id} = props;
    const params = useParams();
    const {bookPath} = params;
    const [moreOpen, setMoreOpen] = useState(false);
    const router = useRouter();
    const l = useLocaleCode();

    return <div
        onClick={() => router.push(`/${l}/wiki/book/${bookPath}/page/${id}/`)}
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
    return data?.map(item => {
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

export const addChild = (data: Catalog[], item: Catalog) => {
    if(!item.parentId) {
        data.push(item);
        return;
    }
    const target = findByKey(data, `${item.parentId}`, false);
    if(!target.children) {
        target.children = [];
    }
    target.children.push(item);
}

export const allParent = (data: Catalog[], id: number): string[] => {
    const result: string[] = [];
    const find = (id: number) => {
        const item = findByKey(data, `${id}`, false);
        if(item?.parentId) {
            result.push(`${item.parentId}`);
            find(item.parentId);
        }
    }
    find(id);
    return result;
}

export const updateItem = (data: Catalog[], ud: UpdateData) => {
    const item = findByKey(data, `${ud.id}`, false);
    item.title = ud.title;
}

export const getAllExpandedKeys = (data: TreeData[]): string[] => {
    const result: string[] = [];
    const find = (data: TreeData[]) => {
        data.forEach(item => {
            if(!!(item.children?.length||0)) {
                result.push(item.key);
                find(item.children);
            }
        })
    }
    find(data);
    return result;
}
