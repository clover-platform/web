import {FC, forwardRef, PropsWithRef, useEffect, useState} from "react";
import {TreeItemProps, TreeSelect} from "@clover/core";
import {AuthorityTree, authorityTree} from "@/rest/access";
import {findNodeById, handleItem} from "@clover/core/components/extend/tree/utils";

const toItems = (data: AuthorityTree[]): TreeItemProps[] => {
    return data.map<TreeItemProps>(item => {
        return {
            id: `${item.id}`,
            content: {
                id: `${item.id}`,
                label: item.name
            },
            children: toItems(item.children || [])
        }
    }).map((item) => handleItem(item, null))
}

const setChildrenDisabled = (items?: TreeItemProps[]) => {
    if(items && items.length) {
        items.forEach(item => {
            item.disabled = true;
            setChildrenDisabled(item.children);
        })
    }
}

const setDisabled = (id: string, items: TreeItemProps[]) => {
    const node = findNodeById(items, id);
    if(node) {
        node.disabled = true;
        setChildrenDisabled(node.children);
    }
}

export interface AuthoritySelectorProps{
    disabledNodeId?: string;
}

const AuthoritySelector: FC<AuthoritySelectorProps> = forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeItemProps[]>([]);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            const items = toItems(data || []);
            props.disabledNodeId && setDisabled(`${props.disabledNodeId}`, items);
            setItems(items)
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <TreeSelect
        {...props}
        loading={loading}
        items={items}
        className={"w-full"}
        placeholder={"{#根节点#}"}
    />
})

export default AuthoritySelector;
