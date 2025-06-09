import { put, resultWrapper } from '@clover/public/utils/rest'

export type UpdateReadmeData = {
  content: string
}

export const updateReadme = (data: UpdateReadmeData) =>
  resultWrapper<unknown>(put<unknown, UpdateReadmeData>('@main/account/readme/update', data))