import { setCookie, deleteCookie, getCookie } from 'cookies-next';

export interface Token {
    token: string,
    expiresIn: number,
}

export const setToken = (data: Token) => {
    setCookie("token", JSON.stringify(data))
}

export const clearToken = () => {
    deleteCookie("token");
}

export const getToken = (cookies?: any): Token | null => {
    const token = getCookie('token', {cookies});
    if(token) {
        return JSON.parse(token);
    }
    return null;
}
