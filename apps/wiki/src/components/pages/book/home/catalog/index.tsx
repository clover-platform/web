import { CatalogLoading } from '@/components/layout/book/catalog/loading'
import {useCatalogLoader} from "@/hooks/use.catalog.loader";
import type { Catalog } from '@/types/module/book'
import {useTimeAgo} from "@clover/public/hooks";
import { Tree, type TreeData, useMessage } from '@easykit/design'
import {useParams, useRouter} from "next/navigation";
import { type FC, useMemo, useState } from 'react'

type CatalogItemProps = Omit<Catalog, "children">;

const CatalogItem: FC<CatalogItemProps> = (props) => {
    const {id, title, createTime} = props;
    const ago = useTimeAgo();
    const router = useRouter();
    const { bookPath } = useParams();

    return (
      <div
        onClick={() => router.push(`/wiki/book/${bookPath}/page/${id}`)}
        className={'flex items-center justify-center space-x-4 text-sm'}
      >
        <div>{title}</div>
        <div className={'h-0 flex-1 border-b border-dashed'} />
        <div className={'text-secondary-foreground/50'}>{ago.format(new Date(createTime))}</div>
      </div>
    )
}

export const toTreeItemProps = (data: Catalog[]): TreeData[] => {
    return data?.map(item => {
        return {
            key: `${item.id}`,
            title: <CatalogItem {...item} />,
            children: toTreeItemProps(item.children)
        }
    });
}

export const HomeCatalog = () => {
    const msg = useMessage();
    const [loading, load, data, setData] = useCatalogLoader();
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

    const treeData = useMemo<TreeData[]>(() => {
        return toTreeItemProps(data);
    }, [data])

    return <div className={"my-4"}>
        {
            loading ? <CatalogLoading/> : <Tree
                treeData={treeData}
                draggable={false}
                selectable={false}
                expandedKeys={expandedKeys}
                onExpand={(expandedKeys) => setExpandedKeys(expandedKeys as string[])}
            />
        }
    </div>
}
