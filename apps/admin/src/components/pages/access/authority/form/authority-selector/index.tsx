import {FC, useEffect, useState} from "react";
import {TreeData, TreeSelect, TreeSelectProps} from "@easykit/design";
import {authorityTree} from "@/rest/access";
import {setDisabled, toItems} from "@/components/pages/access/authority/form/utils";
import { t } from '@clover/public/locale'

export type AuthoritySelectorProps = Omit<TreeSelectProps, "treeData"> & {
    disabledNodeId?: string;
}

export const AuthoritySelector: FC<AuthoritySelectorProps> = (props) => {
    const {value, disabledNodeId, ...rest} = props;
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<TreeData[]>([]);

    const load = async () => {
        setLoading(true);
        const {success, data} = await authorityTree();
        setLoading(false);
        if(success) {
            const items = toItems(data || []);
            disabledNodeId && setDisabled(`${disabledNodeId}`, items);
            setItems(items)
        }
    }

    useEffect(() => {
        load().then();
    }, []);

    return <TreeSelect
        {...rest}
        value={value?`${value}`: undefined}
        loading={loading}
        treeData={items}
        className={"w-full"}
        placeholder={t("根节点")}
    />
}
