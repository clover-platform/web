export type ActivityQueryParams = {
  page: number
  size: number
}

export type Activity = {
  id: number
  moduleId: number
  userId: number
  createTime: string
  type: number
  subType: number
  operate: number
  detail: {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    [key: string]: any
  }
}

export type ActivityGroup = {
  time: string
  list: Activity[]
}
