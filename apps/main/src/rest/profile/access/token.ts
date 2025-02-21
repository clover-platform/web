import {get, post, del} from "@clover/public/utils/rest";
import {AccessToken} from "@/types/profile/access/token";

export const list = (params: any) =>
  get<AccessToken>(`@main/account/access/token/list`, params);

export type CreateData = {
  name: string;
  expirationTime?: number;
}

export const create = (data: CreateData) =>
  post<string, CreateData>(`@main/account/access/token/create`, data);

export const revoke = (id: number) =>
  del(`@main/account/access/token/${id}/revoke`);
