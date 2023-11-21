import {forwardRef, useEffect, useState} from "react";
import {TreeItemProps, TreeSelect} from "@clover/core";
import {AuthorityTree, authorityTree} from "@/rest/access";

const toItems = (data: AuthorityTree[]): TreeItemProps[] => {
    return data.map(item => {
        return {
            id: `${item.id}`,
            content: {
                id: `${item.id}`,
                label: item.name
            },
            children: toItems(item.children || [])
        }
    })
}

const AuthoritySelector = forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeItemProps[]>([]);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            setItems(toItems(data || []))
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
