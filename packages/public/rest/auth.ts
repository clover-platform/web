import type { LoginFormData } from '../config/schema/login'
import type { Token } from '../utils/token'

import type { Account } from '@clover/public/types/account'
import { get, post, resultWrapper } from '@clover/public/utils/rest'

export type LoginRestData = {
  code?: string
} & LoginFormData

export const login = (data: LoginRestData) =>
  resultWrapper<Token>(post<Token, LoginRestData>('@main/account/login', data))

// 获取个人信息
export const profile = () => get<Account, null>('@main/account/profile', null)

export const logout = () => post('@main/account/logout')
