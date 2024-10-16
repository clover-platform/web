export type Account = {
    id: number;
    authorities: string[];
    otpStatus: number;
    currentProjectId: number;
    currentTeamId: number;
    username: string;
}

export type User = {
    id: number;
    email: string;
    username: string;
    avatar: string;
}
