export interface LoginResult {
    token: string;
}

export interface EmailCode {
    code: string,
    createdAt: number,
}

export interface CheckRegisterEmailRequest {
    username: string;
    email: string;
    code: string;
}

export interface CheckRegisterEmailResult {
    token: string;
}
