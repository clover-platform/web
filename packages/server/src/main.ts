import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import {GlobalExceptionFilter} from "./app/exception.filter";
import {ResultInterceptor} from "./app/result.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new ResultInterceptor());
    await app.listen(3000);
}

bootstrap().then();
