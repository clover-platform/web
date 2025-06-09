import { get, post, resultWrapper } from '@clover/public/utils/rest'
import type { Token } from '@clover/public/utils/token'
import type { OpenUser } from './types'

export type LinkCodeData = {
  type?: string
  code: string
}

export type LinkCodeResult = {
  token: string
  expiresIn: number
  isBind: boolean
} & OpenUser

export const linkCode = (data: LinkCodeData) =>
  resultWrapper<LinkCodeResult>(
    get<LinkCodeResult, LinkCodeData>(`@account/auth/link/${data.type}/code`, { code: data.code })
  )

type LoginAndLinkData = {
  account: string
  password: string
  token: string
}

export const loginAndLink = (data: LoginAndLinkData) =>
  resultWrapper<Token>(post<Token, LoginAndLinkData>('@main/account/link/bind', data))
