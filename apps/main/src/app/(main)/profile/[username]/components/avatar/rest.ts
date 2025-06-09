import { put, resultWrapper } from '@clover/public/utils/rest'

export type UpdateAvatarData = {
  url: string
}
export const updateAvatar = (data: UpdateAvatarData) =>
  resultWrapper<unknown>(put<unknown, UpdateAvatarData>('@main/account/profile/avatar', data))