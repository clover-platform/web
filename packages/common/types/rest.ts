export type RestResult<T> = {
    success: boolean;
    code: number;
    message?: string;
    data?: T;
}

export type PageRequest<T> = RestResult<{
    total: number;
    data: T[];
}>
