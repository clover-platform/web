export interface TokenResult {
    token: string;
    expiresIn: number;
}

export interface CheckRegisterEmailRequest {
    username: string;
    name: string;
    email: string;
    code: string;
}

export interface CheckResetEmailRequest {
    email: string;
    code: string;
}

export interface SetPasswordRequest {
    id?: number;
    password: string;
    otpCode: string;
}

export interface ResetPasswordRequest {
    id?: number;
    password: string;
}

export interface TokenOptions {
    expiresIn: string;
}


export interface AccountPasswordDTO {
    username: string,
    originPassword: string;
    password: string;
    token: string;
}
