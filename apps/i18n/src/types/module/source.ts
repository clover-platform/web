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