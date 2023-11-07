import {ConfigService} from "@nestjs/config";
import Redis from "ioredis";
import Redlock, {Lock, Settings} from "redlock";
import {Injectable} from "@nestjs/common";

@Injectable()
export class RedlockService {
    redlock: Redlock;
    constructor(private readonly configService: ConfigService){
        const redisConfig = configService.get("redis");
        const client = new Redis(parseInt(redisConfig.port), redisConfig.host, {
            username: redisConfig.username,
            password: redisConfig.password,
        })
        this.redlock = new Redlock([client], {
            driftFactor: 0.01,
            retryCount: 10,
            retryDelay: 200,
            retryJitter: 200,
            automaticExtensionThreshold: 500
        });
    }

    async acquire(resources: string[], duration: number, settings?: Partial<Settings>): Promise<Lock> {
        return await this.redlock.acquire(resources, duration, settings);
    }
}
