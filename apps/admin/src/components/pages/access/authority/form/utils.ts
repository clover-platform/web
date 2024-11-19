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

export const setDisabled = (id: string, items: TreeData[]) => {
    items.forEach(item => {
        if(item.key === id) {
            item.disabled = true;
            setAllChildrenDisabled(item.children || []);
        }else{
            setDisabled(id, item.children || []);
        }
    })
}

const setAllChildrenDisabled = (items: TreeData[]) => {
    items.forEach(item => {
        item.disabled = true;
        setAllChildrenDisabled(item.children || []);
    })
}
