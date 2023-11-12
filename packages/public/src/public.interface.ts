export interface SendCodeParams {
    email: string;
    action: string;
}

export interface CheckCodeParams {
    email: string;
    action: string;
    code: string;
}

export interface EmailCode {
    code: string,
    createdAt: number,
}
