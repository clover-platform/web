export interface AddAuthorityRequest {
    parentId?: number;
    name: string;
    key: string;
    apis: number[];
}

export interface AuthorityTree {
    id: number;
    name: string;
    key: string;
    children?: AuthorityTree[];
}
