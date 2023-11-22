import { TreeItemProps } from "@clover/core/components/extend/tree/index";

export const handleItem = (item: TreeItemProps, parent: TreeItemProps | null | undefined) => {
    const { children = [] } = item;
    item.hasChildren = children.length > 0;
    item.parent = parent;
    item.children = children.map((child) => handleItem(child, item));
    return item;
}

export const findNodeById = (nodes: TreeItemProps[], id: string): TreeItemProps => {
    for(let node of nodes) {
        if(node.id === id) {
            return node;
        }
        if(node.children) {
            const n = findNodeById(node.children, id);
            if(n) return n;
        }
    }
    return null;
}

export const setNodeAntChildrenChecked = (node: TreeItemProps, checked: boolean) => {
    if(!node.disabled) {
        node.checked = checked;
        node.indeterminate = false;
        if(node.hasChildren) {
            node.children.forEach((n) => setNodeAntChildrenChecked(n, checked))
        }
    }
}

export const setParentChecked = (node: TreeItemProps, checked: boolean) => {
    if(node.parent && !node.parent.disabled) {
        const parent = node.parent;
        const children = parent.children;
        const checkedChildren = children.filter((n) => n.checked);
        const disabledChildren = children.filter((n) => n.disabled);
        if(checkedChildren.length === 0) {
            parent.checked = false;
            parent.indeterminate = false;
        } else if(checkedChildren.length === children.length - disabledChildren.length) {
            parent.checked = true;
            parent.indeterminate = false;
        } else {
            parent.checked = false;
            parent.indeterminate = true;
        }
        setParentChecked(parent, checked);
    }
}

export const handleCheckedChange = (node: TreeItemProps, checked: boolean) => {
    setNodeAntChildrenChecked(node, checked);
    setParentChecked(node, checked);
}

export const unSelectedAllNotById = (nodes: TreeItemProps[], id: string) => {
    for(let node of nodes) {
        if(node.id !== id) {
            node.selected = false;
        }
        if(node.hasChildren) {
            unSelectedAllNotById(node.children, id);
        }
    }
}

export const initExpanded = (nodes: TreeItemProps[], expanded: string[]) => {
    for(let node of nodes) {
        node.expanded = false;
        if(expanded.includes(node.id)) {
            node.expanded = true;
        }
        if(node.hasChildren) {
            initExpanded(node.children, expanded);
        }
    }
    return nodes;
}

export const getAllExpanded = (nodes: TreeItemProps[]) => {
    const expanded = [];
    for(let node of nodes) {
        if(node.expanded) {
            expanded.push(node.id);
        }
        if(node.hasChildren) {
            expanded.push(...getAllExpanded(node.children));
        }
    }
    return expanded;
}

export const initSelected = (nodes: TreeItemProps[], selected: string) => {
    for(let node of nodes) {
        node.selected = node.id === selected;
        if(node.hasChildren) {
            initSelected(node.children, selected);
        }
    }
    return nodes;
}


export const initExpansion = (items:TreeItemProps[], selected: string) => {
    const node = findNodeById(items, selected);
    const expansion = [];
    if(node) {
        let parent = node.parent;
        while(parent) {
            if(parent.children && parent.children.length) {
                expansion.push(parent.id);
            }
            parent = parent.parent;
        }
    }
    return expansion;
}
