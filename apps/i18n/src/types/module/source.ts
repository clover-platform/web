export type File = {
  id: number // 主键
  moduleId: number // 模块ID
  name: string // 分支名
  uploadTime: string // 创建时间
  updateTime: string // 更新时间
  uploadUserId: number // 上传人ID
  updateUserId: number // 更新人ID
  importStatus: number // 是否已导入 0 未导入 1 已导入
  revisionVersion: number // 变更版本
  wordCount: number // 字数
}

export type FileRevision = {
  id: number // 主键
  fileId: number // 文件ID
  createTime: string // 创建时间
  current: boolean // 是否是当前
  message: string // 备注信息
  addedSize: number // 新增数量
  updatedSize: number // 更新数量
  deletedSize: number // 删除数量
  version: number // 版本号
}