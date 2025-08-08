import { getRootDomain } from '.'

import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { COOKIE_MAX_AGE } from '@clover/public/config/app'

export interface Token {
  token: string
  expiresIn: number
}

export const setToken = (data: Token) => {
  setCookie('token', JSON.stringify(data), {
    maxAge: COOKIE_MAX_AGE,
    domain: getRootDomain(window.location.hostname),
  })
}

export const clearToken = () => {
  deleteCookie('token')
}

// biome-ignore lint/suspicious/noExplicitAny: getToken
export const getToken = async (cookies?: any): Promise<Token | null> => {
  const token = await getCookie('token', { cookies })
  let tokenData: Token | null = null
  if (token) {
    try {
      tokenData = JSON.parse(token)
    } catch {
      // 忽略解析错误，tokenData 保持为 null
    }
  }
  return tokenData
}
