import {User} from "@clover/public/types/account";

type Params = {
    bookPath: string;
    pageId?: number;
}

type PromiseParams = Promise<Params>

export type PromisePageProps = {
    params: PromiseParams
}

export type PageProps = {
    params: Params
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
