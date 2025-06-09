import type { z } from 'zod'
import type { getSchema } from './schema'

export type OpenUser = {
  id: number
  openId: string
  username: string
  platform: string
  accountId: number
  avatar: string
  accessToken: string
  tokenType: string
}

export type LinkFormData = z.infer<ReturnType<typeof getSchema>>