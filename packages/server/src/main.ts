import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import {GlobalExceptionFilter} from "./app/exception.filter";
import {ResultInterceptor} from "./app/result.interceptor";
import {ConfigService} from "@nestjs/config";
import agent from 'skywalking-backend-js';

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
}

bootstrap().then();
