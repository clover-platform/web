import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import {ConfigService} from "@nestjs/config";
import {RedisConfig} from "@easy-kit/config/interface";

export default CacheModule.registerAsync({
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            store: redisStore,
            ...configService.get<RedisConfig>("redis")
        }
    },
})
