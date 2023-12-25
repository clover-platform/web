export interface AccessAuthorityDTO {
    parentId?: number;
    id?: number;
    name: string;
    key: string;
    sort: number;
    apis: number[];
}

export interface AccessRoleDTO {
    id?: number;
    name: string;
    description?: string;
    enable?: boolean;
    authorities?: number[];
    authorityTree?: AuthorityTree[];
}

export interface AuthorityTree {
    parentId?: number;
    id: number;
    name: string;
    key: string;
    children?: AuthorityTree[];
}

export interface RoleQueryParams {
    keyword?: string;
    enable?: string;
}
