import {FC, forwardRef, useEffect, useState} from "react";
import {TreeData, TreeSelect} from "@easykit/design";
import {authorityTree} from "@/rest/access";
import {toItems} from "@/components/pages/access/authority/form/utils";
import { t } from '@easykit/common/utils/locale'

export interface AuthoritySelectorProps{
    disabledNodeId?: string;
}

const AuthoritySelector: FC<AuthoritySelectorProps> = forwardRef((props, ref) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeData[]>([]);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            const items = toItems(data || []);
            // props.disabledNodeId && setDisabled(`${props.disabledNodeId}`, items);
            setItems(items)
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <TreeSelect
        {...props}
        loading={loading}
        treeData={items}
        className={"w-full"}
        placeholder={t("根节点")}
    />
})

export default AuthoritySelector;
