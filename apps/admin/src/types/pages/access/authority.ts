export type Authority = {
    id?: number;
    name: string;
    value: string;
    sort: number;
    parentId?: number;
    apis?: number[];
}

export type AuthorityTreeNode = Authority & {
    children: AuthorityTreeNode[];
}
