export type BookHomePage = {
    id: number;
    bookId: number;
    content: string;
    createTime: Date;
    updateUser: number;
}

export type BookCount = {
    memberCount: number;
    pageCount: number;
    wordCount: number;
}

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
    homePage?: BookHomePage;
    count?: BookCount;
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
