export interface RestResult<Data> {
    code: number;
    success?: boolean;
    message?: string;
    data?: Data;
}
