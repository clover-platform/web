export type RestResult<T> = {
    success: boolean;
    code: number;
    message?: string;
    data?: T;
}
