import {COOKIE_MAX_AGE} from "@clover/public/config/app";
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export interface Token {
  token: string,
  expiresIn: number,
}

export const setToken = (data: Token) => {
  setCookie("token", JSON.stringify(data), {
    maxAge: COOKIE_MAX_AGE,
  })
}

export const clearToken = () => {
  deleteCookie("token");
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getToken = async (cookies?: any): Promise<Token | null> => {
  const token = await getCookie('token', {cookies});
  let tokenData: Token | null = null
  if (token) {
    try {
      tokenData = JSON.parse(token)
    } catch {
      // 忽略解析错误，tokenData 保持为 null
    }
  } 
  return tokenData;
}
