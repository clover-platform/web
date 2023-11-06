import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import {GlobalExceptionFilter} from "./app/exception.filter";
import {ResultInterceptor} from "./app/result.interceptor";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new ResultInterceptor());
    await app.listen(configService.get("server").port);
}

bootstrap().then();
