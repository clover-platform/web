export type Bundle = {
  id: number
  moduleId: number
  userId: number
  createTime: Date
  name: string
  format: string
  includeSource: boolean
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  formatConfig: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  sources: any
}
