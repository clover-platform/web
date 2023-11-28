import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {GlobalExceptionFilter} from "@easy-kit/public/exception.filter";
import {ResultInterceptor} from "@easy-kit/public/result.interceptor";
import {ConfigService} from "@nestjs/config";
import expressListRoutes from 'express-list-routes';
import {AccessApiService} from "@easy-kit/account/access/api.service";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {Logger} from "@nestjs/common";

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new ResultInterceptor());

    // swagger
    const config = new DocumentBuilder()
        .setTitle('幸运草平台')
        .setDescription('幸运草平台接口文档。')
        .setVersion('1.0')
        // .addTag('cats')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    // 启动
    await app.listen(configService.get("server").port);
    logger.log('server port: ', configService.get("server").port);

    // 入库 router
    const accessApiService = app.get(AccessApiService);
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const all = expressListRoutes(router, { logger: ()=>{} });
    await accessApiService.sync(all);
}

bootstrap().then();
