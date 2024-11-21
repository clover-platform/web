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

    const [checkedKeys, setCheckedKeys] = useState<string[]>(value);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeData[]>([]);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            const items = toItems(data || []);
            setItems(items)
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <Tree
        checkedKeys={checkedKeys}
        checkable={true}
        onCheck={(keys) => {
            const ks = keys as string[];
            setCheckedKeys(ks);
            onChange?.(ks);
        }}
        treeData={items}
        selectable={false}
    />
}
