import {Tree, TreeData} from "@easykit/design";
import {FC, useEffect, useState} from "react";
import {authorityTree} from "@/rest/access";
import {toItems} from "@/components/pages/access/authority/form/utils";

export interface AuthorityTreeProps {
    value?: any[];
    onChange?: (value: any[]) => void;
}

export const AuthorityTree: FC<AuthorityTreeProps> = (props) => {
    const {
        value = [],
        onChange = (value: any[]) => {},
    } = props;

    const [selectedKeys, setSelectedKeys] = useState<string[]>(value);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeData[]>([]);
    const [treeKey, setTreeKey] = useState(Date.now());

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            const items = toItems(data || []);
            setItems(items)
            setTreeKey(Date.now());
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <Tree
        key={treeKey}
        selectedKeys={selectedKeys}
        checkable={true}
        onCheck={(keys) => {
            const ks = keys as string[];
            setSelectedKeys(ks);
            onChange?.(ks);
        }}
        treeData={items}
        selectable={false}
    />
}
