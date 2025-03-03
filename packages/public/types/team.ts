export type Team = {
  id: number;
  name: string;
  ownerId: number;
  createTime: Date;
  teamKey: string;
  memberType: number;
  isCollect: boolean;
  cover?: string;
}
