import {User} from "@clover/public/types/account";

export type PageProps = {
    params: {
        bookPath: string;
        pageId?: number;
    }
}

export type PageDetail = {
    id: number;
    title: string;
    bookId: number;
    parentId: number;
    owner: number;
    createTime: Date;
    content: string;
    versionNumber: number;
    updateTime: Date;
    updateUser: number;
    collected: boolean;
    userList: {
        owner: boolean;
        userId: number;
        account: User;
    }[]
}
