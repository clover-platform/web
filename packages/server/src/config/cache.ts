import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import {ConfigService} from "@nestjs/config";

export default CacheModule.registerAsync({
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        return {
            store: redisStore,
            ...configService.get("redis")
        }
    },
})
