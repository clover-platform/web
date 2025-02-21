import {setCookie, deleteCookie, getCookie} from 'cookies-next';
import {COOKIE_MAX_AGE} from "@clover/public/config/app";

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

export const getToken = async (cookies?: any): Promise<Token | null> => {
  const token = await getCookie('token', {cookies});
  let tokenData = null;
  if (token) {
    try {
      tokenData = JSON.parse(token);
    } catch (e) {
    }
  }
  return tokenData;
}
