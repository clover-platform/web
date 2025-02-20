export type Account = {
    id: number;
    email: string;
    authorities: string[];
    currentProjectId: number;
    currentTeamId: number;
    username: string;
    otpBind: boolean;
    requireOtp: boolean;
}

export type User = {
    id: number;
    email: string;
    username: string;
    avatar: string;
}
