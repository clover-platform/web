export class PageResult<T> {
    total: number;
    data: T[];

    static of<T>(total: number, data: T[]): PageResult<T> {
        const result = new PageResult<T>();
        result.data = data;
        result.total = total;
        return result;
    }
}
