import {get} from "@clover/public/utils/rest";

export type AppsItemProps = {
    title: string;
    description: string;
    url: string;
    icon: string;
}

export const apps = () =>
    get<AppsItemProps[]>(`@main/config/apps`);
