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

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeData[]>([]);
    const [treeKey, setTreeKey] = useState(Date.now());
    const [expansion, setExpansion] = useState<string[]>([]);

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
        // checked={value}
        // onExpandedChange={setExpansion}
        // expanded={expansion}
        key={treeKey}
        // loading={loading}
        // border={true}
        treeData={items}
        selectable={true}
        // checkbox={true}
        // onCheckedChange={(nodes) => {
        //     onChange(nodes.map(({id}) => id));
        // }}
    />
}
