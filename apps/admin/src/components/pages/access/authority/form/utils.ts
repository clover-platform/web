import {AuthorityTree} from "@/rest/access";
import {TreeData} from "@easykit/design";

export const toItems = (data: AuthorityTree[]): TreeData[] => {
    return data.map<TreeData>(item => {
        return {
            key: `${item.id}`,
            title: item.name,
            children: toItems(item.children || [])
        }
    });
}
