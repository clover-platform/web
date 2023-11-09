export interface TokenResult {
    token: string;
    expiresIn: number;
}

export interface EmailCode {
    code: string,
    createdAt: number,
}

export interface OTPSecretResult {
    secret: string;
    url: string;
}

export interface CheckRegisterEmailRequest {
    username: string;
    email: string;
    code: string;
}

export interface SetPasswordRequest {
    id?: number;
    password: string;
    otpCode: string;
}

export interface TokenOptions {
    expiresIn: string;
}
