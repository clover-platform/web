import type { User } from '@clover/public/types/account'
import type { File } from './source'

export type Entry = {
  id: number
  identifier: string
  value: string
  moduleId: number
  fileId: number
  context?: string
  createTime?: Date
  updateTime?: Date
  createUserId?: number
  updateUserId?: number
  verified?: boolean
  translated?: boolean
  translation?: EntryResult
  file?: File
}

export type EntryResult = {
  id: number
  entryId: number
  content: string
  language: string
  createTime: Date
  translatorId: number
  checkerId: number
  updateTime: Date
  verified: boolean
  translator?: User
  verifier?: User
  verifiedTime?: Date
}

export type EntryResultPage = {
  total: number;
  data: EntryResult[];
}

export type CountEntryQuery = {
  module: string
  language: string
  fileId?: number
}

export type CountEntryData = {
  total: number;
  translated: number;
  verified: number;
}

export type EntryComment = {
  id: number;
  entryId: number;
  content: string;
  createTime: Date;
  createUserId: number;
  user?: User;
}
