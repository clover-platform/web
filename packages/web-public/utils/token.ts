export interface Token {
    token: string,
    expiresIn: number,
}

export const setToken = (data: Token) => {
    localStorage.setItem("token", JSON.stringify(data));
}

export const getToken = (): Token | null => {
    const token = localStorage.getItem("token");
    if(token) {
        return JSON.parse(token);
    }
    return null;
}
