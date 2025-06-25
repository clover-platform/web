import type { User } from '@clover/public/types/account'

export type Entry = {
  id: number
  identifier: string
  value: string
  moduleId: number
  fileId: number
  verified: boolean
  translated: boolean
  translation?: EntryResult
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
  module: string;
  language: string;
  branch?: string;
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
