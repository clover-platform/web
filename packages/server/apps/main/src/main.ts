import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {GlobalExceptionFilter} from "@easy-kit/public/exception.filter";
import {ResultInterceptor} from "@easy-kit/public/result.interceptor";
import {ConfigService} from "@nestjs/config";
import agent from 'skywalking-backend-js';
import expressListRoutes from 'express-list-routes';
import {AccessApiService} from "@easy-kit/account/access/api.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    app.useGlobalFilters(new GlobalExceptionFilter());
    app.useGlobalInterceptors(new ResultInterceptor());
    const skyWalking = configService.get("skywalking");
    agent.start({
        serviceName: skyWalking.serviceName,
        serviceInstance: skyWalking.serviceInstance,
        collectorAddress: skyWalking.collectorAddress,
    });
    await app.listen(configService.get("server").port);

    const accessApiService = app.get(AccessApiService);
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const all = expressListRoutes(router, { logger: ()=>{} });
    accessApiService.sync(all);
}

bootstrap().then();
