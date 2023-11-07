export class Result<T> {
    code: number;
    message: string;
    data: T;
    success: boolean;

    static success<T>(r?: {data: T, message?: string}): Result<T> {
        r = r || {data: null};
        const result = new Result<T>();
        result.code = 0;
        result.message = r.message;
        result.data = r.data;
        result.success = true;
        return result;
    }

    static error<T>(r: {code?: number, data?: T, message?: string}): Result<T> {
        const result = new Result<T>();
        result.code = r.code;
        result.message = r.message;
        result.data = r.data;
        result.success = false;
        return result;
    }
}
