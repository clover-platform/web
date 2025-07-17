import type { User } from './account'

export type ActivityApp = {
  id: string
  label: string
  name: string
  baseUrl: string
}

export type Activity = {
  id: number
  action: string
  url: string
  userId: number
  createTime: string
  title: string
  metadata: Record<string, unknown>
  app: ActivityApp
  account: User
}

export type ActivityGroup = {
  time: string
  formatted: string
  list: Activity[]
}
