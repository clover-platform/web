import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message;
        Logger.error(message);
        const errorResponse = {
            success: false,
            message,
            code: status, // 自定义code
            path: request['originalUrl'], // 错误的url地址
        };
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}
