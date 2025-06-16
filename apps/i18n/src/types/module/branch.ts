export type Branch = {
  id: number;
  moduleId: number;
  name: string;
  isDefault: boolean;
  updateTime: Date;
  createTime: Date;
}

export type BranchMergeOverview = {
  deleted: number
  added: number
  changed: number
}
