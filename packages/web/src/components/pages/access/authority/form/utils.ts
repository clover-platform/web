import {AuthorityTree} from "@/rest/access";
import {TreeItemProps} from "@clover/core";
import {handleItem} from "@clover/core/components/extend/tree/utils";

export const toItems = (data: AuthorityTree[]): TreeItemProps[] => {
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
