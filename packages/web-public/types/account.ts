export type Account = {
    id: number;
    authorities: string[];
    otpStatus: number;
    projectId: number;
    teamId: number;
    username: string;
}

export type User = {
    id: number;
    email: string;
    username: string;
    avatar: string;
}
