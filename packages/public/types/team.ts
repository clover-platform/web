import {User} from "@clover/public/types/account";

export type Team = {
  id: number;
  name: string;
  ownerId: number;
  createTime: Date;
  teamKey: string;
  memberType: number;
  isCollect: boolean;
  cover?: string;
  owner: User;
}
