export type Book = {
    id: number;
    name: string;
    description: string;
    projectId: number;
    cover: string;
    logo: string;
    createTime: Date;
    updateTime: Date;
    privacy: number;
    path: string;
}

export type Catalog = {
    id: number;
    bookId: number;
    parentId: number;
    title: string;
    owner: number;
    ownerInfo: string;
    createTime: Date;
    children: Catalog[];
}
