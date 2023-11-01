import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store";
import redisConfig from "./redis";

export default CacheModule.register({
    isGlobal: true,
    store: redisStore,
    ...redisConfig
})
