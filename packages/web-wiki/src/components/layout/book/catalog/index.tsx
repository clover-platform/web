import {Tree, TreeItemProps} from "@/components/common/tree";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {catalog} from "@/rest/page";
import {useSearchParams} from "next/navigation";
import {Catalog} from "@/types/pages/book";
import {AddPageAction} from "@/components/layout/book/add-page-action";

type TreeTitleProps = {
    id: number;
    title: string;
}

const TreeTitle: FC<TreeTitleProps> = (props) => {
    return <div className={"flex group justify-center items-center space-x-1"}>
        <div className={"w-0 flex-1 leading-6"}>{props.title}</div>
        <div className={"hidden group-hover:block"}><AddPageAction parent={Number(props.id)} className={"w-6 h-6 !p-0"} /></div>
    </div>
}

const toTreeItemProps = (data: Catalog[]): TreeItemProps<any>[] => {
    return data.map(item => {
        return {
            id: `${item.id}`,
            title: <TreeTitle title={item.title} id={item.id} />,
            children: toTreeItemProps(item.children)
        }
    });
}

export const CatalogTree = () => {
    const search = useSearchParams();
    const id = search.get("id");
    const [data, setData] = useState<Catalog[]>([]);

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

    const treeData = useMemo<TreeItemProps<any>[]>(() => {
        return toTreeItemProps(data);
    }, [data])

    return <Tree
        className={"mx-2 my-1"}
        data={treeData}
        onChange={(nodes) => {
            console.log('onChange', nodes);
        }}
    />
}
