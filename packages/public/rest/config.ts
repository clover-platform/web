import {get} from "@clover/public/utils/rest";

export type AppsItemProps = {
  appId: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  iconUrl: string;
}

export const apps = () => get<AppsItemProps[]>('@main/config/app/list')
