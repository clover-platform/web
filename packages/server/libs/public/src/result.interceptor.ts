import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Result} from "@easy-kit/public/result.entity";
interface Response<T> {
    data: T;
}
@Injectable()
export class ResultInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {
        const request = context.switchToHttp().getRequest();
        return next.handle().pipe(
            map(data => {
                if(data instanceof Result) {
                    return {
                        ...data,
                        path: request['originalUrl'],
                    };
                }
                return {
                    data,
                    code: 0,
                    success: true,
                    path: request['originalUrl'],
                };
            }),
        );
    }
}
