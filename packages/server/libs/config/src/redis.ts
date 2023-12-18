import { ConfigService } from "@nestjs/config";
import { DynamicModule } from "@nestjs/common";
import { RedisModule } from "@liaoliaots/nestjs-redis";
import { RedisConfig } from "@easy-kit/config/interface";

export default RedisModule.forRootAsync({
    useFactory: (configService: ConfigService) => {
        const config = configService.get<RedisConfig>('redis');
        return {config};
    },
    inject:[ConfigService]
}) as DynamicModule;
